import type { IPricing } from "../types";

export const pricingData: IPricing[] = [
    {
        name: "Basic",
        price: 29,
        period: "month",
        features: [
            "50 thumbnail/mo",
            "Basic Templates",
            "Standard Resolution",
            "No watermark",
            "Email support"
        ],
        mostPopular: false
    },
    {
        name: "Pro",
        price: 79,
        period: "month",
        features: [
            "Unlimited Ai-generated thumbnails",
            "Access to all templates",
            "High Resolution",
            "A/B testing",
            "Priority Support",
            "Custom Fonts"
        ],
        mostPopular: true
    },
    {
        name: "Enterprise",
        price: 199,
        period: "month",
        features: [
            "Bulk Thumbnail Generation",
            "Advanced A/B Testing (Simple Upgrade)",
            "Scheduled Generation",
            "API Key Management",
            "Custom Export Sizes",
        ],
        mostPopular: false
    }
];