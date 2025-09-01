import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function SignUpSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <Card className="shadow-xl border-0">
          <CardHeader className="text-center pb-8">
            <div className="mx-auto mb-4">
              <img src="/centra-wordmark.png" alt="Centra" className="h-8" />
            </div>
            <CardTitle className="text-2xl font-semibold text-gray-900">Check your email</CardTitle>
            <CardDescription className="text-gray-600">We've sent you a confirmation link</CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-700">
                Please check your email and click the confirmation link to activate your account. Once confirmed, you
                can sign in to join the Centra Community.
              </p>
            </div>
            <Button asChild className="w-full h-11 bg-[#1C60FF] hover:bg-[#1C60FF]/90">
              <Link href="/auth/login">Back to Sign In</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
