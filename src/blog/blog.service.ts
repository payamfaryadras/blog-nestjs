import {Inject, Injectable} from "@nestjs/common";
import {REQUEST} from "@nestjs/core";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Post} from "./entities/post.entity";
import {PostCreateDto} from "./dto/post.create.dto";
import {PostDto} from "./dto/post.dto";
import {toPostDto} from "../shared/mapper";
import {Comment} from "./entities/comment.entity";

@Injectable()
export class BlogService {
    constructor(
        @Inject(REQUEST)
        private readonly request,
        @InjectRepository(Comment)
        private readonly commentRepo: Repository<Comment>,
        @InjectRepository(Post)
        private readonly postRepo: Repository<Post>,
    ) {
    }

    async createPost(postCreateDto: PostCreateDto): Promise<PostDto> {
        const post = await this.postRepo.save({description: postCreateDto.description, user: this.request.user})
        return toPostDto(post);
    }

    async updatePost(id: string, photoUrl: string) {
        return await this.postRepo.update(id, {photoUrl: photoUrl});
    }

    async getPost(id: string): Promise<Post> {
        return await this.postRepo.findOneOrFail(id);

    }

    async createComment(id: string, comment: Comment): Promise<Comment> {
        const post = await this.postRepo.findOneOrFail(id);
        comment.post = post;
        return await this.commentRepo.save(comment);
    }

    async getComments(id: string): Promise<Comment[]> {
        const post = await this.postRepo.findOneOrFail(id);
        return await this.commentRepo.find({post});
    }
}
