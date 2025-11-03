import React from 'react';
import { User } from 'lucide-react';

// 默认头像 - 使用渐变背景
export function DefaultAvatar({ name, size = 'md' }) {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-16 h-16 text-xl',
    xl: 'w-24 h-24 text-3xl'
  };

  // 从名字生成首字母
  const initial = name ? name.charAt(0).toUpperCase() : '?';
  
  // 根据名字生成一致的渐变色
  const gradients = [
    'from-blue-500 to-cyan-500',
    'from-purple-500 to-pink-500',
    'from-green-500 to-emerald-500',
    'from-orange-500 to-red-500',
    'from-indigo-500 to-purple-500',
    'from-pink-500 to-rose-500',
  ];
  
  const gradientIndex = name 
    ? name.charCodeAt(0) % gradients.length 
    : 0;
  
  return (
    <div 
      className={`
        ${sizeClasses[size]} 
        bg-gradient-to-br ${gradients[gradientIndex]}
        rounded-full flex items-center justify-center
        font-bold text-white shadow-lg
      `}
    >
      {initial}
    </div>
  );
}

// 用户头像组件
export default function UserAvatar({ user, size = 'md', onClick }) {
  const photoURL = user?.photoURL;
  const displayName = user?.displayName || user?.email;

  if (photoURL) {
    const sizeClasses = {
      sm: 'w-8 h-8',
      md: 'w-10 h-10',
      lg: 'w-16 h-16',
      xl: 'w-24 h-24'
    };

    return (
      <div 
        className={`${sizeClasses[size]} rounded-full overflow-hidden ring-2 ring-white/20 ${onClick ? 'cursor-pointer' : ''}`}
        onClick={onClick}
      >
        <img 
          src={photoURL} 
          alt={displayName} 
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  return (
    <div className={onClick ? 'cursor-pointer' : ''} onClick={onClick}>
      <DefaultAvatar name={displayName} size={size} />
    </div>
  );
}
