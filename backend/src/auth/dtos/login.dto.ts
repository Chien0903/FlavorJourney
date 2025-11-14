import { IsEmail, IsNotEmpty, MinLength, IsBoolean, IsOptional } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'メールアドレスの形式が正しくありません。' }) // Email không hợp lệ
  @IsNotEmpty({ message: 'メールアドレスは必須です。' }) // Email không được để trống
  email: string;

  @IsNotEmpty({ message: 'パスワードは必須です。' }) // Mật khẩu không được để trống
  @MinLength(1, { message: 'パスワードが無効です。' }) // Mật khẩu không hợp lệ
  password: string;

  @IsOptional()
  @IsBoolean()
  saveLoginInfo?: boolean;
}