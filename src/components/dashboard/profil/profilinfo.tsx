import * as React from 'react';
import { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { API_BASE_URL } from '@/config';

export function ProfilInfo(): React.JSX.Element {
  const [userData, setUserData] = useState<any>(null); // Til at gemme brugerinformationsdata
  const [loading, setLoading] = useState<boolean>(true);

  // Hent brugerens profildata ved indlæsning
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/user/profile`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          console.error('Failed to fetch user profile');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) return <div>Loading...</div>; // Mens data hentes, vis en loading-tilstand

  return (
    <Card>
      <CardContent>
        <Stack spacing={2} sx={{ alignItems: 'center' }}>
          <div>
            <Avatar
              src={userData?.avatar || '/assets/avatar.png'} // Hvis der er et avatarbillede, vis det, ellers brug standard
              sx={{ height: '80px', width: '80px' }}
            />
          </div>
          <Stack spacing={1} sx={{ textAlign: 'center' }}>
            <Typography variant="h5">{userData.name}</Typography>
            <Typography color="text.secondary" variant="body2">
              {userData.city} {userData.country} {/* Antager, at API'et returnerer city og country */}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
      <Divider />
      <CardActions>
        <Button fullWidth variant="text">
          Upload billede
        </Button>
      </CardActions>
    </Card>
  );
}
