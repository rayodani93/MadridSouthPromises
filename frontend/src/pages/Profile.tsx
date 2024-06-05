import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import supabase from '../config/supabaseClient';
import { useSession } from '@supabase/auth-helpers-react';
import { Form, Button, Alert } from 'react-bootstrap';

interface ProfileType {
  username: string;
  bio: string;
  avatar_url: string;
}

const Profile = () => {
  const session = useSession();
  const [profile, setProfile] = useState<ProfileType>({ username: '', bio: '', avatar_url: '' });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (session) {
        const { data, error } = await supabase
          .from('profiles')
          .select('username, bio, avatar_url')
          .eq('id', session.user.id)
          .single();
        if (error) {
          setError(error.message);
        } else if (data) {
          setProfile(data);
        }
      }
    };

    fetchProfile();
  }, [session]);

  const updateProfile = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (session) {
      const { error } = await supabase.rpc('update_profile', {
        user_id: session.user.id,
        ...profile,
      });
      if (error) {
        setError(error.message);
      } else {
        setSuccess('Perfil actualizado con éxito.');
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1>Actualizar Perfil</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={updateProfile}>
        <Form.Group>
          <Form.Label>Nombre de Usuario</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={profile.username}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Biografía</Form.Label>
          <Form.Control
            as="textarea"
            name="bio"
            value={profile.bio}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>URL del Avatar</Form.Label>
          <Form.Control
            type="text"
            name="avatar_url"
            value={profile.avatar_url}
            onChange={handleChange}
          />
        </Form.Group>
        <Button type="submit" className="mt-3">Actualizar Perfil</Button>
      </Form>
    </div>
  );
};

export default Profile;
