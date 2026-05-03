import React, { useState } from 'react';
import { MapPin, Edit3, Save, Clock } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';

const UserProfile = () => {
  const { points, level, activities, badges, avatar, setAvatar } = useProgress();

  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: 'Rachit',
    state: 'Uttar Pradesh',
    avatar: avatar
  });

  const [editForm, setEditForm] = useState({ ...userInfo, avatar });

  const states = ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi"];

  const handleSave = () => {
    setUserInfo(editForm);
    setAvatar(editForm.avatar);
    setIsEditing(false);
  };

  const progressPercent = Math.min((points / level.max) * 100, 100);

  return (
    <div className="animate-fade-in" style={{ maxWidth: '900px', margin: '0 auto', paddingBottom: '2rem' }}>
      <h2 style={{ color: 'white', marginBottom: '2rem' }}>My Profile</h2>

      {/* Header Card */}
      <div className="card mb-6 flex items-center justify-between" style={{ padding: '2rem' }}>
        <div className="flex items-center gap-6">
          <img src={avatar === 'male' ? "/avatar_male.png" : "/avatar_female.png"} alt="Profile" style={{ width: 80, height: 80, borderRadius: '50%', background: '#ffedd5', border: '3px solid #2A56F6', objectFit: 'cover' }} />
          
          {isEditing ? (
            <div className="flex flex-col gap-3">
              <input 
                type="text" 
                value={editForm.name} 
                onChange={e => setEditForm({...editForm, name: e.target.value})}
                style={{ padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.05)', color: 'white' }}
              />
              <select 
                value={editForm.state} 
                onChange={e => setEditForm({...editForm, state: e.target.value})}
                style={{ padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.05)', color: 'white' }}
              >
                {states.map(s => <option key={s} value={s} style={{color: 'black'}}>{s}</option>)}
              </select>
              <select 
                value={editForm.avatar} 
                onChange={e => setEditForm({...editForm, avatar: e.target.value})}
                style={{ padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.05)', color: 'white' }}
              >
                <option value="female" style={{color: 'black'}}>Female Avatar</option>
                <option value="male" style={{color: 'black'}}>Male Avatar</option>
              </select>
            </div>
          ) : (
            <div>
              <h3 style={{ margin: 0, fontSize: '1.8rem', color: 'white' }}>{userInfo.name}</h3>
              <div className="flex items-center gap-2 mt-2" style={{ color: 'var(--text-muted)' }}>
                <MapPin size={16} />
                <span>{userInfo.state}, India</span>
              </div>
            </div>
          )}
        </div>

        <div>
          {isEditing ? (
            <button className="btn btn-success" onClick={handleSave} style={{ borderRadius: '2rem' }}>
              <Save size={18} /> Save Profile
            </button>
          ) : (
            <button className="btn" onClick={() => setIsEditing(true)} style={{ borderRadius: '2rem' }}>
              <Edit3 size={18} /> Edit Profile
            </button>
          )}
        </div>
      </div>

      {/* Level & Progress */}
      <div className="card mb-6" style={{ background: 'linear-gradient(135deg, rgba(255,153,51,0.1) 0%, rgba(42,86,246,0.1) 100%)' }}>
        <div className="flex justify-between items-end mb-4">
          <div>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Current Status</div>
            <div className="flex items-center gap-3">
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'white' }}>Level {level.number}</div>
              <div style={{ color: '#138808', fontWeight: 600, fontSize: '1.2rem', background: 'rgba(19, 136, 8, 0.1)', padding: '0.2rem 0.8rem', borderRadius: '1rem' }}>{level.title}</div>
            </div>
          </div>
          <div className="text-right">
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#3b82f6' }}>{points} <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>pts</span></div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{Math.max(level.max - points, 0)} pts to next level</div>
          </div>
        </div>
        
        <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{ width: `${progressPercent}%`, height: '100%', background: 'linear-gradient(90deg, #FF9933, #138808, #2A56F6)', transition: 'width 0.5s ease-in-out' }}></div>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Achievements */}
        <div className="flex-1">
          <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'white' }}>Achievements</h3>
          <div className="grid grid-cols-2 gap-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
            {badges.length === 0 ? (
               <div className="text-muted text-sm col-span-2">No achievements unlocked yet. Keep learning!</div>
            ) : badges.map(badge => (
              <div key={badge.id} className="card flex flex-col items-center text-center gap-3 animate-fade-in" style={{ padding: '1.5rem 1rem' }}>
                <div style={{ width: 60, height: 60, borderRadius: '50%', background: badge.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {badge.icon}
                </div>
                <div>
                  <div style={{ fontWeight: 600, color: 'white', fontSize: '0.95rem' }}>{badge.title}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Unlocked {badge.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity History */}
        <div className="flex-1">
          <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'white' }}>Recent Activity</h3>
          <div className="card" style={{ padding: '1rem 1.5rem', height: '100%' }}>
            {activities.length === 0 ? (
                <div className="text-muted text-sm text-center py-4">No recent activity. Start learning to earn points!</div>
            ) : activities.map((activity, index) => (
              <div key={activity.id} className="flex gap-4 animate-fade-in" style={{ padding: '1rem 0', borderBottom: index < activities.length - 1 ? '1px solid var(--glass-border)' : 'none' }}>
                <div style={{ marginTop: '0.2rem' }}>{activity.icon}</div>
                <div>
                  <div style={{ color: 'white', fontSize: '0.95rem', marginBottom: '0.2rem' }}>{activity.text}</div>
                  <div className="flex items-center gap-1" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    <Clock size={12} /> {activity.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default UserProfile;
