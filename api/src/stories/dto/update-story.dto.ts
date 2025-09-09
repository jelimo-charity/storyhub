import { ArticleStatus } from '../models/articles.model';

export class UpdateStoryDto {
	title?: string;
	content?: string;
	slug?: string;
	coverImage?: string;
	status?: ArticleStatus;
	authorId?: number;
	categoryId?: number;
	// tags?: number[];
}
