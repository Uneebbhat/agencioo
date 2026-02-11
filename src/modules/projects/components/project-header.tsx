import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FolderPlusIcon } from 'lucide-react'

export default function ProjectHeader() {
  return (
    <>
      <h3 className="text-2xl font-medium">Projects</h3>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 md:w-1/2">
        <Input type="search" placeholder="Search project" name="searchProject" id="searchProject" />
        <Button>
          <FolderPlusIcon />
          Add project</Button>
      </div>
    </>
  )
}
