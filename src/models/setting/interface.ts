interface ISetting {
  theme: 'dark' | 'light' | 'system';
  profileVisibility: 'private' | 'public';
  dataSharing: boolean;
}

export default ISetting;
