"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import PlaceAutocomplete from "@/components/places/PlaceAutocomplete";
import { useRouter } from "next/navigation";

const birthSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  gender: z.enum(["male", "female", "other"], { message: "Please select gender" }),
  dob: z.string().min(1, "Date of birth is required"),
  tob: z.string().min(1, "Time of birth is required"),
  pob: z.string().min(1, "Place of birth is required"),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
});

type BirthFormValues = z.infer<typeof birthSchema>;

export default function BirthForm() {
  const { toast } = useToast();
  const supabase = createClient();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<BirthFormValues>({
    resolver: zodResolver(birthSchema),
    defaultValues: {
      fullName: "",
      gender: undefined,
      dob: "",
      tob: "",
      pob: "",
    },
  });

  const onSubmit = async (data: BirthFormValues) => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const clientTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "Asia/Kolkata";

      const { error } = await supabase
        .from("user_birth_details")
        .upsert(
          {
            user_id: user.id,
            full_name: data.fullName,
            gender: data.gender,
            dob: data.dob,
            tob: data.tob,
            pob: data.pob,
            date_of_birth: data.dob,
            time_of_birth: data.tob || "12:00",
            place_of_birth: data.pob,
            latitude: data.latitude ?? 28.6139,
            longitude: data.longitude ?? 77.2090,
            timezone: clientTimezone,
          },
          { onConflict: "user_id" }
        );

      if (error) throw error;

      toast({
        title: "Details Saved",
        description: "Your birth details have been recorded. Proceeding to consultation...",
      });
      
      router.push("/consultation");
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Failed to save birth details.";
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold">Birth Details</CardTitle>
        <CardDescription>
          Please provide your accurate birth information for precise astrological calculations.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input 
                {...form.register("fullName")} 
                placeholder="Enter your full name" 
              />
              {form.formState.errors.fullName && (
                <p className="text-xs text-destructive">{form.formState.errors.fullName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Gender</Label>
              <RadioGroup 
                onValueChange={(val) => form.setValue("gender", val as "male" | "female" | "other")} 
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female">Female</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="other" />
                  <Label htmlFor="other">Other</Label>
                </div>
              </RadioGroup>
              {form.formState.errors.gender && (
                <p className="text-xs text-destructive">{form.formState.errors.gender.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="dob">Date of Birth</Label>
              <Input 
                id="dob" 
                type="date" 
                {...form.register("dob")} 
              />
              {form.formState.errors.dob && (
                <p className="text-xs text-destructive">{form.formState.errors.dob.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="tob">Time of Birth</Label>
              <Input 
                id="tob" 
                type="time" 
                {...form.register("tob")} 
              />
              {form.formState.errors.tob && (
                <p className="text-xs text-destructive">{form.formState.errors.tob.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="pob">Place of Birth</Label>
            <PlaceAutocomplete 
              value={form.watch("pob")}
              onChange={(address) => form.setValue("pob", address)}
              onPlaceSelect={(place) => {
                form.setValue("pob", place.displayName);
                form.setValue("latitude", place.latitude);
                form.setValue("longitude", place.longitude);
              }}
              placeholder="Search for your birth city..."
            />
            {form.formState.errors.pob && (
              <p className="text-xs text-destructive">{form.formState.errors.pob.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full text-lg py-6" disabled={loading}>
            {loading ? "Saving Details..." : "Enter Consultation Room →"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
