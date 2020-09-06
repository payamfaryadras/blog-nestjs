import {User} from "../users/user.entity";
import {UserDto} from "../users/dto/user.dto";
import {Post} from "../blog/entities/post.entity";
import {PostDto} from "../blog/dto/post.dto";

export const toUserDto = (data: User): UserDto => {
    const { id, username, mobile } = data;
    const userDto: UserDto = {id, username, mobile,  };
    return userDto;
};
export const toPostDto = (data:Post): PostDto => {
    const { id, description } = data;
    const postDto: PostDto = {id, description,   };
    return postDto;
}
