import { BRAND_NAME } from '@/constants/constants'

function BrandNameAndLogo() {
    return (
        <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-primary rounded-sm rotate-45 flex items-center justify-center shrink-0">
                <div className="w-3 h-3 bg-card rotate-45" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-primary group-data-[collapsible=icon]:hidden truncate">
                {BRAND_NAME}
            </span>
        </div>
    )
}

export default BrandNameAndLogo