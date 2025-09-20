import { useEffect, useState } from "react";
import { EcoCard, EcoCardContent, EcoCardHeader, EcoCardTitle } from "@/components/ui/eco-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EcoButton } from "@/components/ui/eco-button";
import { useAuth } from "@/lib/auth";

export default function AdminUsers() {
  const { user } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("TEACHER");
  const [loading, setLoading] = useState(false);
  const [pending, setPending] = useState<any[]>([]);

  const userServiceBase = `${location.origin.replace(':5173',':8082')}`;

  async function loadPending() {
    const res = await fetch(`${userServiceBase}/users/pending`);
    if (res.ok) setPending(await res.json());
  }

  useEffect(() => { loadPending(); }, []);

  async function handleCreate() {
    try {
      setLoading(true);
      const res = await fetch(`${userServiceBase}/users/admin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, password, role })
      });
      if (!res.ok) throw new Error(await res.text());
      alert('User created');
      setFirstName(""); setLastName(""); setEmail(""); setPassword(""); setRole("TEACHER");
      loadPending();
    } catch (e: any) {
      alert(e.message || 'Failed to create user');
    } finally {
      setLoading(false);
    }
  }

  async function approve(id: number) {
    const res = await fetch(`${userServiceBase}/users/${id}/enable`, { method: 'PUT' });
    if (res.ok) {
      setPending(p => p.filter(x => x.id !== id));
    } else {
      alert(await res.text());
    }
  }

  if (!user || user.role !== 'ADMIN') {
    return <div className="container mx-auto px-4 py-8">Not authorized</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl space-y-8">
      <EcoCard>
        <EcoCardHeader>
          <EcoCardTitle>Create User</EcoCardTitle>
        </EcoCardHeader>
        <EcoCardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>First Name</Label>
              <Input value={firstName} onChange={e=>setFirstName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Last Name</Label>
              <Input value={lastName} onChange={e=>setLastName(e.target.value)} />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input type="email" value={email} onChange={e=>setEmail(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Password</Label>
            <Input type="password" value={password} onChange={e=>setPassword(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Role</Label>
            <select className="border rounded px-3 py-2 bg-background" value={role} onChange={e=>setRole(e.target.value)}>
              <option value="TEACHER">Teacher</option>
              <option value="AMBASSADOR">Ambassador</option>
              <option value="STUDENT">Student</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>
          <EcoButton onClick={handleCreate} disabled={loading}>{loading ? 'Creating...' : 'Create'}</EcoButton>
        </EcoCardContent>
      </EcoCard>

      <EcoCard>
        <EcoCardHeader>
          <EcoCardTitle>Pending Approvals</EcoCardTitle>
        </EcoCardHeader>
        <EcoCardContent>
          {pending.length === 0 ? (
            <div className="text-sm text-muted-foreground">No pending users.</div>
          ) : (
            <div className="space-y-3">
              {pending.map(u => (
                <div key={u.id} className="flex items-center justify-between border rounded p-3">
                  <div>
                    <div className="font-medium">{u.firstName} {u.lastName}</div>
                    <div className="text-xs text-muted-foreground">{u.email} • {u.role}</div>
                  </div>
                  <EcoButton size="sm" onClick={() => approve(u.id)}>Approve</EcoButton>
                </div>
              ))}
            </div>
          )}
        </EcoCardContent>
      </EcoCard>
    </div>
  );
}
