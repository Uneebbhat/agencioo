import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Table, TableCell, TableBody, TableHead, TableRow, TableHeader } from '@/components/ui/table'

export default function TeamTable() {
  return (
    <>
      <div className="rounded-md border bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Example row 1 */}
            <TableRow>
              <TableCell className="font-medium">Jane Doe</TableCell>
              <TableCell>jane@agency.com</TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                  Admin
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-center gap-2">
                  <Button size="sm" variant="outline">
                    Edit
                  </Button>
                  <Button size="sm" variant="destructive">
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
            {/* Example row 2 */}
            <TableRow>
              <TableCell className="font-medium">John Smith</TableCell>
              <TableCell>john@agency.com</TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                  Member
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-center gap-2">
                  <Button size="sm" variant="outline">
                    Edit
                  </Button>
                  <Button size="sm" variant="destructive">
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
            {/* End example data */}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
