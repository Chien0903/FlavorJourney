import { IsEmail, IsNotEmpty, MinLength, Matches, IsString, IsOptional, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

const passwordRegex = /(?=.*[A-Z])|(?=.*[a-z])|(?=.*\d)|(?=.*[^A-Za-z0-9])/g;

export class RegisterDto {
  @IsEmail({}, { message: 'メールアドレスの形式が正しくありません。' }) // Email không hợp lệ
  @IsNotEmpty({ message: 'メールアドレスは必須です。' }) // Email không được để trống
  email: string;

  @IsString({ message: 'ユーザー名は文字列である必要があります。' }) // Tên người dùng phải là chuỗi
  @IsNotEmpty({ message: 'ユーザー名は必須です。' }) // Tên người dùng không được để trống
  username: string;

  @IsNotEmpty({ message: 'パスワードは必須です。' }) // Mật khẩu không được để trống
  @MinLength(8, { message: 'パスワードは8文字以上である必要があります。' }) // Mật khẩu phải có ít nhất 8 ký tự
  @Matches(passwordRegex, { 
    message: 'パスワードには、大文字、小文字、数字、特殊文字のうち、少なくとも2種類を含める必要があります。' // Quy tắc 2/3 (hoặc 2/4)
  })
  password: string;

  @IsNotEmpty({ message: '確認用パスワードは必須です。' }) // Xác nhận mật khẩu không được để trống
  confirmPassword: string;
  
  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: '生年月日は有効な日付である必要があります。' })
  birthday?: Date;

  @IsOptional()
  @IsString()
  location?: string;
}