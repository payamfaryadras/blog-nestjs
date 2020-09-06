import {
    Body,
    Controller,
    Get, HttpStatus,
    Param,
    Post,
    Put,
    Req,
    Res,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import {BlogService} from './blog.service';
import {diskStorage} from 'multer';
import {extname} from 'path';
import {AuthGuard} from '@nestjs/passport';
import {PostCreateDto} from "./dto/post.create.dto";
import {FileInterceptor} from "@nestjs/platform-express";
import {Comment} from "./entities/comment.entity";

@Controller('post')
export class BlogController {
    constructor(private readonly blogService: BlogService) {
    }

    @Post()
    async createPost(@Body() postCreateDto: PostCreateDto,@Req() req: any,) {
        return await this.blogService.createPost(postCreateDto);
    }

    @Put(':postId/')
    @UseInterceptors(FileInterceptor('file',
        {
            storage: diskStorage({
                destination: './avatars',

                filename: (req, file, cb) => {
                    const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
                    return cb(null, `${randomName}${extname(file.originalname)}`)
                }
            })
        }
        )
    )
    uploadAvatar(@Param('postId') postId:string, @UploadedFile() file) {
        return  this.blogService.updatePost(postId, `${file.path}`);
    }

    @Get(":postId")
    async getPost(@Param('postId') postId:string){
        return this.blogService.getPost(postId)
    }

    @Post(":postId/comments")
    async createComment(@Param('postId')postId:string,@Body() comment:Comment){
        return await this.blogService.createComment(postId,comment);
    }

    @Get(":postId/comments")
    async getComments(@Param('postId')postId:string){
        return await this.blogService.getComments(postId);
    }

    @Get(':postId/photo')
    async getPostPhoto(@Param('postId')postId: string,@Res() res) {
        const post = await this.blogService.getPost(postId);

        const response = res.sendFile(post.photoUrl, { root: './' });
        return {
            status: HttpStatus.OK,
            data: response,
        };
    }

}
