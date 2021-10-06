export interface UnsplashData {
    id: string;
    width: number;
    height: number;
    color: string;
    blur_hash: string;
    description: string;
    alt_description: string;
    urls: UnsplashUrls;
    links: UnsplashLinks;
    categories: [];
    likes: number;
    liked_by_user: boolean;
    current_user_collections: [];
    sponsorship: any;
    topic_submissions: [];
    user: UnsplashUser;
    exif: UnsplashExif;
    location: UnsplashLocation;
    views: number;
    downloads: number;
    created_at: Date;
    updated_at: Date;
    promoted_at: Date;
}

interface UnsplashUrls {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
}

interface UnsplashLinks {
    self: string;
    html: string;
    download: string;
    download_location: string;
}

interface UnsplashLocation {
    title: string;
    name: string;
    city: string;
    country: string;
    position: {
        latitude: string | number;
        longitude: string | number;
    }
}

interface UnsplashExif {
    make: string;
    model: string;
    exposure_time: string;
    aperture: string;
    focal_length: string;
    iso: number;
}

interface UnsplashUser {
    id: string;
    updated_at: Date;
    username: string;
    name: string;
    first_name: string;
    last_name: string;
    twitter_username: string;
    portfolio_url: string;
    bio: string;
    location: string;
    links: {
        self: string;
        html: string;
        photos: string;
        likes: string;
        portfolio: string;
        following: string;
        followers: string;
    },
    profile_image: {
        small: string;
        medium: string;
        large: string;
    },
    instagram_username: string;
    total_collections: number;
    total_likes: number;
    total_photos: number;
    accepted_tos: boolean;
    for_hire: boolean;
    social: {
        instagram_username: string;
        portfolio_url: string;
        twitter_username: string;
        paypal_email: string;
    }
}