import React, { useState, useRef, useEffect } from 'react'
import { Badge } from 'react-bootstrap'
import { FiBell, FiCheck, FiTrash2 } from 'react-icons/fi'
import { useNotificationStore } from '@store/notificationStore'
import './NotificationBell.css'

export default function NotificationBell() {
  const { notifications, unreadCount, markAsRead, markAllAsRead, removeNotification } = useNotificationStore()
  const [show, setShow] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => { if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setShow(false) }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const getIconColor = (type) => {
    switch (type) { case 'success': return 'text-success'; case 'warning': return 'text-warning'; case 'error': return 'text-danger'; default: return 'text-info' }
  }

  return (
    <div className="notification-bell-wrapper" ref={dropdownRef}>
      <button className="notification-toggle" onClick={() => setShow(!show)}>
        <FiBell size={22} />
        {unreadCount > 0 && <Badge bg="danger" className="notification-badge">{unreadCount}</Badge>}
      </button>
      {show && (
        <div className="notification-dropdown">
          <div className="notification-header">
            <h6 className="mb-0">Notifications</h6>
            {unreadCount > 0 && <button className="mark-all-btn" onClick={markAllAsRead}><FiCheck size={14} className="me-1" />Tout lire</button>}
          </div>
          <div className="notification-list">
            {notifications.length === 0 ? (
              <div className="notification-empty"><p className="mb-0 text-muted">Aucune notification</p></div>
            ) : (
              notifications.map((notif) => (
                <div key={notif.id} className={`notification-item ${!notif.isRead ? 'unread' : ''}`} onClick={() => markAsRead(notif.id)}>
                  <div className={`notification-dot ${getIconColor(notif.type)}`} />
                  <div className="notification-content">
                    <p className="notification-title mb-0">{notif.title}</p>
                    <p className="notification-message mb-0">{notif.message}</p>
                    <small className="notification-time">{new Date(notif.createdAt).toLocaleString('fr-FR')}</small>
                  </div>
                  <button className="notification-delete" onClick={(e) => { e.stopPropagation(); removeNotification(notif.id) }}><FiTrash2 size={14} /></button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}