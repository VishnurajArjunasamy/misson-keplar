export interface ValidationErrors{
    title: string;
    details: string;
    photo?: string;
}

export interface NewBlogIF {
    title: string;
    details: string;
    photo?: string;
    type: string;
}