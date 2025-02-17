import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
   DialogTrigger
} from "@/components/ui/dialog";
import { Trash } from "lucide-react";

import { useFormStatus } from "react-dom";
import { deleteTransction } from "../_lib/action";

function DeleteDialog({ id }) {
   const [open, setOpen] = useState(false);

   const handleDelete = async () => {
      await deleteTransction(id);
      setOpen(false);
   };

   return (
      <Dialog open={open} onOpenChange={setOpen}>
         <DialogTrigger
            onClick={() => setOpen(true)}
            className="absolute top-1 right-1 inline-flex bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 h-9 px-4 py-2 items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
         >
            <Trash />
         </DialogTrigger>

         <DialogContent>
            <DialogHeader>
               <DialogTitle>Confirm Deletion</DialogTitle>
               <DialogDescription>
                  Are you sure you want to delete this? This action cannot be undone.
               </DialogDescription>
            </DialogHeader>
            <div className="flex justify-end gap-2">
               <Button onClick={() => setOpen(false)}>Cancel</Button>
               <form action={handleDelete}>
                  <SaveButton />
               </form>
            </div>
         </DialogContent>
      </Dialog>
   );
}

export default DeleteDialog;
export function SaveButton() {
   const status = useFormStatus();
   return (
      <Button className=" col-span-3" variant="destructive" disabled={status.pending} type="submit">
         {status.pending ? <span className="animate-spin  inline-block w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full"></span> : <span>Continue</span>}
         {/* <span> Save</span> */}
      </Button>
   )
}
