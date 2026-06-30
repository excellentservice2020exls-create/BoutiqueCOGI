import React from 'react'
import { FiFacebook, FiInstagram, FiTwitter, FiPlay } from 'react-icons/fi'
import './SocialLinks.css'

const socialPlatforms = [
  { icon: FiFacebook, href: 'https://facebook.com/boutiquecogi', label: 'Facebook', color: '#1877F2' },
  { icon: FiInstagram, href: 'https://instagram.com/boutiquecogi', label: 'Instagram', color: '#E4405F' },
  { icon: FiTwitter, href: 'https://twitter.com/boutiquecogi', label: 'Twitter', color: '#1DA1F2' },
  { icon: FiPlay, href: 'https://tiktok.com/@boutiquecogi', label: 'TikTok', color: '#000000' },
]

export default function SocialLinks({ size = 'md', className = '' }) {
  const sizeMap = { sm: 16, md: 20, lg: 24, xl: 28 }
  const iconSize = sizeMap[size] || sizeMap.md
  return (
    <div className={`social-links ${className}`}>
      {socialPlatforms.map((platform) => (
        <a key={platform.label} href={platform.href} target="_blank" rel="noopener noreferrer" className="social-link-item" aria-label={platform.label} style={{ '--social-color': platform.color }}>
          <platform.icon size={iconSize} />
        </a>
      ))}
    </div>
  )
}