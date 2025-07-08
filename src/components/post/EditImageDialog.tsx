'use client';

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Trash2, GripVertical } from "lucide-react";
import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import Image from "next/image";
import { DialogTitle } from "@radix-ui/react-dialog";
interface handleDragEndResult {
    source: {
        index: number;
    };
    destination?: {
        index: number;
    };
    }
interface Props {
  images: File[];
  onSave: (files: File[]) => void;
  onClose: () => void;
}

export const EditImageDialog = ({ images, onSave, onClose }: Props) => {
  const [previewImages, setPreviewImages] = useState<File[]>(images);

  const handleDragEnd = (result : handleDragEndResult) => {
    if (!result.destination) return;
    const updated = Array.from(previewImages);
    const [moved] = updated.splice(result.source.index, 1);
    updated.splice(result.destination.index, 0, moved);
    setPreviewImages(updated);
  };

  const handleDelete = (index: number) => {
    setPreviewImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    onSave(previewImages);
    onClose();
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogTitle>Edit Images</DialogTitle>

        <DragDropContext onDragEnd={(result) => handleDragEnd(result as handleDragEndResult)}>
          <Droppable droppableId="imageList">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                {previewImages.map((file, index) => (
                  <Draggable key={index.toString()} draggableId={index.toString()} index={index}>
                    {(provided) => (
                      <div
                        className="flex items-center gap-2 bg-muted p-2 rounded"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                      >
                        <div {...provided.dragHandleProps}>
                          <GripVertical className="cursor-move text-muted-foreground" />
                        </div>
                        <Image alt="idk" src={URL.createObjectURL(file)} className="w-16 h-16 object-cover rounded" 
                        width={64} height={64}
                        />
                        <button onClick={() => handleDelete(index)} className="ml-auto text-red-500">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose} className="linkedIn-button-outline">Cancel</button>
          <button onClick={handleSave} className="linkedIn-button-filled">Save</button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
