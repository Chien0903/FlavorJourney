import { IsDefined, MinLength, Matches, IsNotEmpty } from 'class-validator';

const passwordRegex = /(?=.*[A-Z])|(?=.*[a-z])|(?=.*\d)|(?=.*[^A-Za-z0-9])/g; 

export class ChangePasswordDto {
  @IsNotEmpty({ message: 'user.password.old_required' })
  oldPassword: string;

  @IsDefined({ message: 'user.password.new_required' })
  @MinLength(8, { message: 'user.password.minchar' })
  @Matches(passwordRegex, { 
    message: 'user.password.rule' 
  })
  password: string; 
  @IsDefined({ message: 'user.password.confirm_required' })
  confirmPassword: string;
}