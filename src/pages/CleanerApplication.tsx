import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ArrowLeft, Upload, X } from "lucide-react";
import logo from "@/assets/logo-optimized.webp";

const applicationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Please enter a valid phone number").max(20),
  hasTransportation: z.boolean(),
  hasSupplies: z.boolean(),
  yearsExperience: z.number().min(0).max(50),
  hasInsurance: z.boolean(),
  canProvideReferences: z.boolean(),
  workAreas: z.array(z.string()).min(1, "Please select at least one work area"),
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

const workAreaOptions = [
  { id: "broward", label: "Broward County" },
  { id: "palm-beach", label: "Palm Beach County" },
  { id: "miami-dade", label: "Miami Dade County" },
];

const CleanerApplication = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      hasTransportation: false,
      hasSupplies: false,
      yearsExperience: 0,
      hasInsurance: false,
      canProvideReferences: false,
      workAreas: [],
    },
  });

  const workAreas = watch("workAreas");

  const handleWorkAreaChange = (areaId: string, checked: boolean) => {
    const current = workAreas || [];
    if (checked) {
      setValue("workAreas", [...current, areaId]);
    } else {
      setValue("workAreas", current.filter((id) => id !== areaId));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setUploadedFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const uploadFiles = async (): Promise<string[]> => {
    const filenames: string[] = [];
    
    for (const file of uploadedFiles) {
      const fileExt = file.name.split(".").pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`;
      
      const { error } = await supabase.storage
        .from("supply-pictures")
        .upload(fileName, file);
      
      if (error) {
        console.error("Upload error:", error);
        throw error;
      }
      
      // Store just the filename - admins will generate signed URLs to view
      filenames.push(fileName);
    }
    
    return filenames;
  };

  const onSubmit = async (data: ApplicationFormData) => {
    setIsSubmitting(true);
    
    try {
      let pictureUrls: string[] = [];
      
      if (uploadedFiles.length > 0) {
        setUploading(true);
        pictureUrls = await uploadFiles();
        setUploading(false);
      }
      
      const { error } = await supabase.from("cleaner_applications").insert({
        name: data.name,
        email: data.email,
        phone: data.phone,
        has_transportation: data.hasTransportation,
        has_supplies: data.hasSupplies,
        years_experience: data.yearsExperience,
        has_insurance: data.hasInsurance,
        can_provide_references: data.canProvideReferences,
        supply_pictures: pictureUrls,
        work_areas: data.workAreas,
      });
      
      if (error) throw error;

      // Send confirmation email to admin
      try {
        await supabase.functions.invoke("send-cleaner-application-notification", {
          body: {
            name: data.name,
            email: data.email,
            phone: data.phone,
            hasTransportation: data.hasTransportation,
            hasSupplies: data.hasSupplies,
            yearsExperience: data.yearsExperience,
            hasInsurance: data.hasInsurance,
            canProvideReferences: data.canProvideReferences,
            workAreas: data.workAreas,
            supplyPictures: pictureUrls,
          },
        });
      } catch (emailError) {
        console.error("Failed to send notification email:", emailError);
      }

      // Send SMS notification via OpenPhone
      try {
        await supabase.functions.invoke("send-sms-notification", {
          body: {
            type: "cleaner_application",
            data: {
              name: data.name,
              email: data.email,
              phone: data.phone,
              yearsExperience: data.yearsExperience,
              hasTransportation: data.hasTransportation,
              hasSupplies: data.hasSupplies,
              hasInsurance: data.hasInsurance,
              workAreas: data.workAreas,
            },
          },
        });
      } catch (smsError) {
        console.error("SMS notification error:", smsError);
      }
      
      toast({
        title: "Application Submitted!",
        description: "Thank you for applying. We'll review your application and get back to you soon.",
      });
      
      navigate("/");
    } catch (error: any) {
      console.error("Submission error:", error);
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-background border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <img src={logo} alt="TIDYWISE Logo" className="h-10 w-auto" />
              <span className="font-display text-xl font-bold text-foreground">TIDYWISE</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-display">Join Our Team</CardTitle>
            <CardDescription>
              Apply to become a TIDYWISE cleaning professional
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Basic Info */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    {...register("name")}
                    placeholder="Enter your full name"
                    className="mt-1"
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder="Enter your email"
                    className="mt-1"
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    {...register("phone")}
                    placeholder="(555) 555-5555"
                    className="mt-1"
                  />
                  {errors.phone && (
                    <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="yearsExperience">Years of Experience *</Label>
                  <Input
                    id="yearsExperience"
                    type="number"
                    min={0}
                    max={50}
                    {...register("yearsExperience", { valueAsNumber: true })}
                    placeholder="0"
                    className="mt-1"
                  />
                  {errors.yearsExperience && (
                    <p className="text-sm text-destructive mt-1">{errors.yearsExperience.message}</p>
                  )}
                </div>
              </div>

              {/* Yes/No Questions */}
              <div className="space-y-4 border-t border-border pt-6">
                <h3 className="font-semibold text-foreground">Requirements</h3>
                
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="hasTransportation"
                    checked={watch("hasTransportation")}
                    onCheckedChange={(checked) => setValue("hasTransportation", !!checked)}
                  />
                  <Label htmlFor="hasTransportation" className="cursor-pointer">
                    Do you have reliable transportation?
                  </Label>
                </div>

                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="hasSupplies"
                    checked={watch("hasSupplies")}
                    onCheckedChange={(checked) => setValue("hasSupplies", !!checked)}
                  />
                  <Label htmlFor="hasSupplies" className="cursor-pointer">
                    Do you have your own cleaning supplies?
                  </Label>
                </div>

                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="hasInsurance"
                    checked={watch("hasInsurance")}
                    onCheckedChange={(checked) => setValue("hasInsurance", !!checked)}
                  />
                  <Label htmlFor="hasInsurance" className="cursor-pointer">
                    Do you have liability insurance?
                  </Label>
                </div>

                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="canProvideReferences"
                    checked={watch("canProvideReferences")}
                    onCheckedChange={(checked) => setValue("canProvideReferences", !!checked)}
                  />
                  <Label htmlFor="canProvideReferences" className="cursor-pointer">
                    Can you provide references?
                  </Label>
                </div>
              </div>

              {/* Work Areas */}
              <div className="space-y-4 border-t border-border pt-6">
                <h3 className="font-semibold text-foreground">Service Areas *</h3>
                <p className="text-sm text-muted-foreground">
                  Select the areas where you can provide cleaning services
                </p>
                
                <div className="space-y-3">
                  {workAreaOptions.map((area) => (
                    <div key={area.id} className="flex items-center space-x-3">
                      <Checkbox
                        id={area.id}
                        checked={workAreas?.includes(area.id)}
                        onCheckedChange={(checked) => handleWorkAreaChange(area.id, !!checked)}
                      />
                      <Label htmlFor={area.id} className="cursor-pointer">
                        {area.label}
                      </Label>
                    </div>
                  ))}
                </div>
                {errors.workAreas && (
                  <p className="text-sm text-destructive">{errors.workAreas.message}</p>
                )}
              </div>

              {/* Supply Pictures Upload */}
              <div className="space-y-4 border-t border-border pt-6">
                <h3 className="font-semibold text-foreground">Supply Pictures</h3>
                <p className="text-sm text-muted-foreground">
                  Upload photos of your cleaning supplies (optional)
                </p>
                
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <input
                    type="file"
                    id="supplyPictures"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="supplyPictures"
                    className="cursor-pointer flex flex-col items-center gap-2"
                  >
                    <Upload className="h-8 w-8 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Click to upload images
                    </span>
                  </label>
                </div>

                {uploadedFiles.length > 0 && (
                  <div className="space-y-2">
                    {uploadedFiles.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-muted/50 rounded-lg px-4 py-2"
                      >
                        <span className="text-sm truncate">{file.name}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {uploading ? "Uploading files..." : "Submitting..."}
                  </>
                ) : (
                  "Submit Application"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default CleanerApplication;
