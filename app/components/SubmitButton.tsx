"use client"
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { useFormStatus } from 'react-dom'

type AppProps = {
    text: string;
    variant?:
      | "default"
      | "destructive"
      | "outline"
      | "secondary"
      | "ghost"
      | "link"
      | null
      | undefined;
}

  

const SubmitButton = ({ text, variant }: AppProps) => {
    const { pending } = useFormStatus();




    return (
        <>
            {pending ? (
                <Button className='w-full cursor-not-allowed' disabled>
                    <Loader2 className='size-4 mr-2 animate-spin ' /> Please wait...
                </Button>
            ) : (
                <Button type="submit" className='w-full' variant={variant}>
                    {text}
                </Button>
            )}
        </>
    )
}

export default SubmitButton