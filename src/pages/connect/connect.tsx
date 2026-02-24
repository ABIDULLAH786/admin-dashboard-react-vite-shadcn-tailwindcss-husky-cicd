import BrandNameAndLogo from "@/components/BrandNameAndLogo"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useAuth } from "@/hooks/useAuth"
import { Wallet } from "lucide-react"
import { useNavigate } from "react-router-dom" // 1. Import useNavigate

function ConnectPage() {
    const navigate = useNavigate()
    const { login } = useAuth()
    const handleConnect = () => {
        console.log("Mocking MetaMask connection...")

        //  Create dummy user data
        const dummyUser = {
            address: "0x95aC4f16048a462e83D3dB82415B7192558fAAC8",
            role: "admin",
            email: "admin@longsword.com",
            name: "Admin User",
            avatar: "",
            connectedAt: new Date().toISOString(),
        }

        login(dummyUser)

        // Redirect to your protected dashboard route
        navigate("/dashboard") // or whatever your main admin route is named
    }

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background p-4 relative overflow-hidden">

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

            <Card className="w-full max-w-md bg-card border-border shadow-2xl z-10 relative">
                <CardHeader className="flex flex-col items-center space-y-4 pt-10">
                    <BrandNameAndLogo />

                    <div className="text-center space-y-2 mt-4">
                        <CardTitle className="text-2xl font-bold tracking-tight text-foreground">
                            Admin Login
                        </CardTitle>
                        <CardDescription className="text-muted-foreground text-sm px-4">
                            Connect your MetaMask wallet to verify your identity and access the Longsword dashboard.
                        </CardDescription>
                    </div>
                </CardHeader>

                <CardContent className="pb-10 px-8">
                    <Button
                        onClick={handleConnect}
                        className="w-full h-12 text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
                    >
                        <Wallet className="w-5 h-5 shrink-0" />
                        Connect MetaMask
                    </Button>

                    <div className="mt-8 text-center">
                        <p className="text-xs text-muted-foreground">
                            New to Web3?{" "}
                            <a
                                href="https://metamask.io/"
                                target="_blank"
                                rel="noreferrer"
                                className="text-primary hover:underline transition-all"
                            >
                                Download MetaMask
                            </a>
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default ConnectPage
export { ConnectPage as Component }