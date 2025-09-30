'use client';

import { useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { getAltTextSuggestion } from './actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Lightbulb, Copy } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? <Loader2 className="animate-spin mr-2" /> : <Lightbulb className="mr-2" />}
      Sugerir Texto Alternativo
    </Button>
  );
}

export default function SeoHelperPage() {
  const [state, formAction] = useFormState(getAltTextSuggestion, {});
  const [preview, setPreview] = useState<string | null>(null);
  const [imageData, setImageData] = useState<string>('');
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        setPreview(dataUrl);
        setImageData(dataUrl);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const copyToClipboard = () => {
    if (state.altText) {
        navigator.clipboard.writeText(state.altText);
        toast({
            title: "Copiado",
            description: "Texto alternativo copiado al portapapeles."
        })
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Asistente SEO para Imágenes</CardTitle>
          <CardDescription>
            Sube una imagen para obtener una sugerencia de texto alternativo (alt text) generada por IA.
          </CardDescription>
        </CardHeader>
        <form action={formAction}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="image">Imagen</Label>
              <Input id="image" type="file" accept="image/*" onChange={handleFileChange} required />
            </div>
            {preview && (
              <div className="mt-4">
                <img src={preview} alt="Vista previa" className="rounded-md max-h-48 mx-auto" />
              </div>
            )}
            <input type="hidden" name="imageData" value={imageData} />
            {state?.error && <p className="text-sm text-destructive">{state.error}</p>}
          </CardContent>
          <CardFooter>
            <SubmitButton />
          </CardFooter>
        </form>
        {state?.altText && (
          <CardFooter>
             <Alert>
                <Lightbulb className="h-4 w-4" />
                <AlertTitle>Sugerencia de Texto Alternativo</AlertTitle>
                <AlertDescription className="mt-2 flex justify-between items-center">
                  <p className="italic">"{state.altText}"</p>
                  <Button variant="ghost" size="icon" onClick={copyToClipboard}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </AlertDescription>
            </Alert>
          </CardFooter>
        )}
      </Card>
    </main>
  );
}
