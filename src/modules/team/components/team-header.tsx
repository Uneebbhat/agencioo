import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { UsersIcon } from 'lucide-react'

export default function TeamHeader() {
  return (
    <>
      <h3 className="text-2xl font-medium">Team</h3>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 md:w-1/2">
        <Input type="search" placeholder="Search user" name="searchUser" id="searchUser" />
        <Button>
          <UsersIcon />
          Add user</Button>
      </div>
    </>
  )
}
