// import { useState, useEffect, useRef } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Checkbox } from "@/components/ui/checkbox";
// import { 
//   Select, 
//   SelectContent, 
//   SelectItem, 
//   SelectTrigger, 
//   SelectValue 
// } from "@/components/ui/select";
// import { useToast } from "@/components/ui/use-toast";
// import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
// import { 
//   Check, 
//   Pencil, 
//   Trash2, 
//   Play, 
//   Pause, 
//   DollarSign, 
//   PlusCircle, 
//   MessageSquare, 
//   Image, 
//   Mic, 
//   MicOff,
//   Palette 
// } from "lucide-react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { cn } from "@/lib/utils";
// import { format } from "date-fns";

// // Types
// export type Priority = "low" | "medium" | "high";
// export type SortOption = "createdAt" | "priority";
// export type FilterOption = "all" | "active" | "completed";

// export interface Note {
//   id: string;
//   text: string;
//   timestamp: Date;
//   imageUrl?: string;
//   audioUrl?: string;
// }

// export interface Task {
//   id: string;
//   title: string;
//   completed: boolean;
//   priority: Priority;
//   createdAt: Date;
//   notes: Note[];
//   timerRunning: boolean;
//   timerStartedAt?: Date;
//   totalTimeSpent: number;
//   costInCents: number;
//   costPerSecond: number;
// }

// // Helper function to generate unique ID
// const generateId = () => Math.random().toString(36).substring(2) + Date.now().toString(36);

// const EmbeddedTodoApp = () => {
//   // Main state
//   const [tasks, setTasks] = useState<Task[]>(() => {
//     const savedTasks = localStorage.getItem("tasks");
//     if (savedTasks) {
//       try {
//         return JSON.parse(savedTasks).map((task: any) => ({
//           ...task,
//           createdAt: new Date(task.createdAt),
//           notes: (task.notes || []).map((note: any) => ({
//             ...note,
//             timestamp: new Date(note.timestamp)
//           })),
//           timerStartedAt: task.timerStartedAt ? new Date(task.timerStartedAt) : undefined,
//           timerRunning: false, // Always start with timers off when reloading
//           totalTimeSpent: task.totalTimeSpent || 0,
//           costInCents: task.costInCents || 0,
//           costPerSecond: task.costPerSecond || 1 // Default to 1 cent per second
//         }));
//       } catch (error) {
//         console.error("Failed to parse tasks from localStorage:", error);
//         return [];
//       }
//     }
//     return [];
//   });
  
//   const [themeColor, setThemeColor] = useState("pink");

//   // UI state for task input
//   const [title, setTitle] = useState("");
//   const [priority, setPriority] = useState<Priority>("medium");

//   // UI state for task list
//   const [sortBy, setSortBy] = useState<SortOption>("createdAt");
//   const [filterBy, setFilterBy] = useState<FilterOption>("all");

//   const { toast } = useToast();

//   // Save tasks to localStorage whenever they change
//   useEffect(() => {
//     localStorage.setItem("tasks", JSON.stringify(tasks));
//   }, [tasks]);

//   // Task handlers
//   const handleAddTask = (e?: React.FormEvent) => {
//     if (e) e.preventDefault();
    
//     if (title.trim()) {
//       const newTask: Task = {
//         id: generateId(),
//         title,
//         completed: false,
//         priority,
//         createdAt: new Date(),
//         notes: [],
//         timerRunning: false,
//         totalTimeSpent: 0,
//         costInCents: 0,
//         costPerSecond: 1 // Default to 1 cent per second
//       };
      
//       setTasks(prevTasks => [newTask, ...prevTasks]);
      
//       toast({
//         title: "Task added",
//         description: `"${title}" has been added to your list.`,
//         duration: 2000
//       });
      
//       setTitle("");
//       setPriority("medium");
//     }
//   };

//   const handleToggleComplete = (id: string) => {
//     setTasks(prevTasks => 
//       prevTasks.map(task => 
//         task.id === id 
//           ? { ...task, completed: !task.completed } 
//           : task
//       )
//     );
//   };

//   const handleDeleteTask = (id: string) => {
//     const taskToDelete = tasks.find(task => task.id === id);
    
//     setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    
//     toast({
//       title: "Task deleted",
//       description: `"${taskToDelete?.title}" has been removed.`,
//       duration: 2000
//     });
//   };

//   const handleEditTask = (id: string, newTitle: string) => {
//     setTasks(prevTasks => 
//       prevTasks.map(task => 
//         task.id === id 
//           ? { ...task, title: newTitle } 
//           : task
//       )
//     );
//   };

//   const handleAddNote = (id: string, text: string, imageUrl?: string, audioUrl?: string) => {
//     const newNote: Note = {
//       id: generateId(),
//       text,
//       timestamp: new Date(),
//       imageUrl,
//       audioUrl
//     };

//     setTasks(prevTasks =>
//       prevTasks.map(task =>
//         task.id === id
//           ? { ...task, notes: [newNote, ...task.notes] }
//           : task
//       )
//     );

//     toast({
//       title: "Note added",
//       description: "Your note has been added to the task.",
//       duration: 2000
//     });
//   };

//   const handleToggleTimer = (id: string) => {
//     setTasks(prevTasks =>
//       prevTasks.map(task => {
//         if (task.id !== id) return task;
        
//         // If task is not already running, start the timer
//         // Note: We don't allow stopping the timer once it's started
//         if (!task.timerRunning) {
//           return {
//             ...task,
//             timerRunning: true,
//             timerStartedAt: new Date()
//           };
//         }
        
//         // If timer is running, we don't allow stopping it
//         return task;
//       })
//     );
//   };

//   const handleUpdateCost = (id: string, costInCents: number) => {
//     setTasks(prevTasks =>
//       prevTasks.map(task =>
//         task.id === id
//           ? { 
//               ...task, 
//               costInCents,
//               // When updating cost, also update costPerSecond if timer is not running
//               costPerSecond: task.timerRunning ? task.costPerSecond : 1
//             }
//           : task
//       )
//     );
    
//     toast({
//       title: "Cost updated",
//       description: "Task cost has been updated.",
//       duration: 2000
//     });
//   };

//   // Filter and sort tasks
//   const filteredTasks = tasks.filter(task => {
//     if (filterBy === "all") return true;
//     if (filterBy === "active") return !task.completed;
//     if (filterBy === "completed") return task.completed;
//     return true;
//   });
  
//   const sortedTasks = [...filteredTasks].sort((a, b) => {
//     if (sortBy === "createdAt") {
//       return b.createdAt.getTime() - a.createdAt.getTime();
//     } else if (sortBy === "priority") {
//       const priorityWeight = { high: 3, medium: 2, low: 1 };
//       return priorityWeight[b.priority] - priorityWeight[a.priority];
//     }
//     return 0;
//   });
  
//   const pendingTasksCount = tasks.filter(task => !task.completed).length;

//   // Theme options
//   const themes = [
//     // { name: "Blue", value: "blue", color: "bg-blue-500" },
//     // { name: "Green", value: "green", color: "bg-green-500" },
//     // { name: "Purple", value: "purple", color: "bg-purple-500" },
//     // { name: "Orange", value: "orange", color: "bg-orange-500" },
//     { name: "Pink", value: "pink", color: "bg-pink-500" }
//   ];

//   return (
//     <div className="max-w-3xl mx-auto mt-16 p-4 sm:p-6">
//       <header className="text-center mb-8 relative">
//         <div className="absolute right-0 top-0">
//           {/* Theme Selector Component */}
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               {/* <Button variant="outline" size="icon" className="w-10 h-10"> */}
//                 {/* <Palette className="h-5 w-5" /> */}
//               {/* </Button> */}
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end">
//               {themes.map((theme) => (
//                 <DropdownMenuItem
//                   key={theme.value}
//                   onClick={() => setThemeColor(theme.value)}
//                   className="flex items-center gap-2 cursor-pointer"
//                 >
//                   <span className={`h-4 w-4 rounded-full ${theme.color}`} />
//                   {theme.name}
//                   {themeColor === theme.value && (
//                     <span className="ml-auto text-primary">✓</span>
//                   )}
//                 </DropdownMenuItem>
//               ))}
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//         <h1 className="text-3xl font-bold text-primary">Tasks Today</h1>
//         <p className="text-muted-foreground mt-2">Create a task, let's get it done!</p>
//       </header>
      
//       {/* Task Input Component */}
//       <form onSubmit={handleAddTask} className="flex gap-2 mb-6">
//         <Input
//           placeholder="Add a new task..."
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           className="flex-1"
//         />
        
//         <Select
//           value={priority}
//           onValueChange={(val) => setPriority(val as Priority)}
//         >
//           <SelectTrigger className="w-[120px]">
//             <SelectValue placeholder="Priority" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="low">Low</SelectItem>
//             <SelectItem value="medium">Medium</SelectItem>
//             <SelectItem value="high">High</SelectItem>
//           </SelectContent>
//         </Select>
        
//         <Button type="submit" className="gap-2">
//           <PlusCircle size={18} /> Add
//         </Button>
//       </form>
      
//       {/* Task List Component */}
//       <div className="space-y-4">
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2">
//           <h2 className="text-lg font-medium">
//             {pendingTasksCount === 0 
//               ? "All tasks completed! 🎉" 
//               : `${pendingTasksCount} task${pendingTasksCount === 1 ? "" : "s"} remaining`}
//           </h2>
          
//           <div className="flex gap-2 w-full sm:w-auto">
//             <Select value={filterBy} onValueChange={(val) => setFilterBy(val as FilterOption)}>
//               <SelectTrigger className="w-full sm:w-[130px]">
//                 <SelectValue placeholder="Filter" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All</SelectItem>
//                 <SelectItem value="active">Active</SelectItem>
//                 <SelectItem value="completed">Completed</SelectItem>
//               </SelectContent>
//             </Select>
            
//             <Select value={sortBy} onValueChange={(val) => setSortBy(val as SortOption)}>
//               <SelectTrigger className="w-full sm:w-[130px]">
//                 <SelectValue placeholder="Sort by" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="createdAt">Date added</SelectItem>
//                 <SelectItem value="priority">Priority</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </div>
        
//         {sortedTasks.length === 0 ? (
//           <div className="text-center py-8 text-muted-foreground">
//             {filterBy === "all" 
//               ? "No tasks yet. Add your first task above!" 
//               : filterBy === "active" 
//                 ? "No active tasks. All done!" 
//                 : "No completed tasks yet."}
//           </div>
//         ) : (
//           <div>
//             {sortedTasks.map((task) => (
//               <TaskItem 
//                 key={task.id} 
//                 task={task} 
//                 onToggleComplete={handleToggleComplete} 
//                 onDelete={handleDeleteTask}
//                 onEdit={handleEditTask}
//                 onAddNote={handleAddNote}
//                 onToggleTimer={handleToggleTimer}
//                 onUpdateCost={handleUpdateCost}
//               />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// // Task Item Component (contained within the main component)
// const TaskItem = ({ 
//   task, 
//   onToggleComplete, 
//   onDelete, 
//   onEdit,
//   onAddNote,
//   onToggleTimer,
//   onUpdateCost
// }: {
//   task: Task;
//   onToggleComplete: (id: string) => void;
//   onDelete: (id: string) => void;
//   onEdit: (id: string, newTitle: string) => void;
//   onAddNote: (id: string, text: string, imageUrl?: string, audioUrl?: string) => void;
//   onToggleTimer: (id: string) => void;
//   onUpdateCost: (id: string, cost: number) => void;
// }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedTitle, setEditedTitle] = useState(task.title);
//   const [elapsedTime, setElapsedTime] = useState<number>(task.totalTimeSpent);
//   const [editingCost, setEditingCost] = useState(false);
//   const [costValue, setCostValue] = useState(task.costInCents.toString());
//   const [currentCost, setCurrentCost] = useState(task.costInCents);

//   useEffect(() => {
//     let interval: NodeJS.Timeout | undefined;
    
//     if (task.timerRunning) {
//       interval = setInterval(() => {
//         const startTime = task.timerStartedAt || new Date();
//         const currentElapsed = task.totalTimeSpent + (new Date().getTime() - startTime.getTime());
//         setElapsedTime(currentElapsed);
        
//         // Calculate the current cost based on time elapsed
//         const secondsElapsed = Math.floor(currentElapsed / 1000);
//         const costPerSecond = task.costPerSecond || 1; // Default to 1 cent per second if not set
//         const calculatedCost = task.costInCents + (secondsElapsed * costPerSecond);
//         setCurrentCost(calculatedCost);
//       }, 1000);
//     } else {
//       setElapsedTime(task.totalTimeSpent);
//       setCurrentCost(task.costInCents);
//     }
    
//     return () => {
//       if (interval) clearInterval(interval);
//     };
//   }, [task.timerRunning, task.timerStartedAt, task.totalTimeSpent, task.costInCents, task.costPerSecond]);
  
//   const handleEditSubmit = () => {
//     if (editedTitle.trim()) {
//       onEdit(task.id, editedTitle);
//     }
//     setIsEditing(false);
//   };

//   const formatTime = (ms: number): string => {
//     const seconds = Math.floor((ms / 1000) % 60);
//     const minutes = Math.floor((ms / (1000 * 60)) % 60);
//     const hours = Math.floor(ms / (1000 * 60 * 60));
    
//     return hours > 0 
//       ? `${hours}h ${minutes}m ${seconds}s`
//       : minutes > 0 
//         ? `${minutes}m ${seconds}s` 
//         : `${seconds}s`;
//   };

//   const handleAddNoteToTask = (text: string, imageUrl?: string, audioUrl?: string) => {
//     onAddNote(task.id, text, imageUrl, audioUrl);
//   };

//   const handleCostSubmit = () => {
//     const cost = parseInt(costValue) || 0;
//     onUpdateCost(task.id, cost);
//     setEditingCost(false);
//   };

//   const formatCost = (cents: number): string => {
//     return `$${(cents / 100).toFixed(2)}`;
//   };

//   const priorityColor = {
//     low: "bg-green-500",
//     medium: "bg-yellow-500",
//     high: "bg-red-500"
//   }[task.priority];

//   return (
//     <div 
//       className={cn(
//         "task-item group flex flex-col gap-2 p-3 bg-white rounded-md shadow-sm border border-border mb-2 animate-fade-in relative",
//         task.completed && "bg-muted/50"
//       )}
//     >
//       <div className="flex items-center gap-2">
//         {/* Priority indicator */}
//         <div className={cn("h-4 w-1 rounded-full", priorityColor)} />
        
//         <div className="flex-1 flex items-center gap-3">
//           <Checkbox 
//             className="task-checkbox h-5 w-5"
//             checked={task.completed}
//             onCheckedChange={() => onToggleComplete(task.id)}
//           />
          
//           {isEditing ? (
//             <input
//               className="flex-1 border-b border-primary/30 px-1 py-0.5 outline-none focus:border-primary"
//               value={editedTitle}
//               onChange={(e) => setEditedTitle(e.target.value)}
//               onBlur={handleEditSubmit}
//               onKeyDown={(e) => e.key === 'Enter' && handleEditSubmit()}
//               autoFocus
//             />
//           ) : (
//             <span className={cn("flex-1", task.completed && "line-through text-muted-foreground")}>
//               {task.title}
//             </span>
//           )}
//         </div>
        
//         <div className="flex items-center gap-2">
//           <div className="flex items-center gap-1">
//             {editingCost ? (
//               <div className="flex items-center">
//                 <DollarSign size={14} className="text-muted-foreground" />
//                 <input 
//                   type="number" 
//                   className="w-16 h-6 px-1 text-xs border"
//                   value={costValue}
//                   onChange={(e) => setCostValue(e.target.value)}
//                   onBlur={handleCostSubmit}
//                   onKeyDown={(e) => e.key === 'Enter' && handleCostSubmit()}
//                   autoFocus
//                 />
//               </div>
//             ) : (
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 className="h-6 py-0 px-2 text-xs flex items-center gap-0.5 text-muted-foreground hover:text-primary"
//                 onClick={() => setEditingCost(true)}
//               >
//                 <DollarSign size={14} />
//                 {formatCost(task.timerRunning ? currentCost : task.costInCents)}
//               </Button>
//             )}
//           </div>
          
//           <span className="text-xs text-muted-foreground whitespace-nowrap">
//             {formatTime(elapsedTime)}
//           </span>
          
//           <Button
//             variant="ghost"
//             size="icon"
//             className="h-8 w-8 text-muted-foreground hover:text-primary"
//             onClick={() => onToggleTimer(task.id)}
//             disabled={task.timerRunning} // Cannot pause once timer is running
//           >
//             {task.timerRunning ? <Pause size={16} className="text-red-500" /> : <Play size={16} />}
//           </Button>
          
//           <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
//             <Button 
//               variant="ghost" 
//               size="icon" 
//               className="h-8 w-8 text-muted-foreground hover:text-primary"
//               onClick={() => {
//                 if (!isEditing) {
//                   setIsEditing(true);
//                 } else {
//                   handleEditSubmit();
//                 }
//               }}
//             >
//               {isEditing ? <Check size={16} /> : <Pencil size={16} />}
//             </Button>
//             <Button 
//               variant="ghost" 
//               size="icon" 
//               className="h-8 w-8 text-muted-foreground hover:text-destructive"
//               onClick={() => onDelete(task.id)}
//             >
//               <Trash2 size={16} />
//             </Button>
//           </div>
//         </div>
//       </div>
      
//       {/* Notes Component */}
//       <NotesList 
//         notes={task.notes} 
//         onAddNote={handleAddNoteToTask}
//       />
//     </div>
//   );
// };

// // Notes List Component (contained within TaskItem)
// const NotesList = ({ 
//   notes, 
//   onAddNote 
// }: {
//   notes: Note[];
//   onAddNote: (text: string, imageUrl?: string, audioUrl?: string) => void;
// }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [newNote, setNewNote] = useState("");
//   const [selectedImage, setSelectedImage] = useState<File | null>(null);
//   const [isRecording, setIsRecording] = useState(false);
//   const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
//   const mediaRecorderRef = useRef<MediaRecorder | null>(null);
//   const audioChunksRef = useRef<BlobPart[]>([]);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const handleAddNoteInternal = () => {
//     if (newNote.trim() || selectedImage || audioBlob) {
//       const imageUrl = selectedImage ? URL.createObjectURL(selectedImage) : undefined;
//       const audioUrl = audioBlob ? URL.createObjectURL(audioBlob) : undefined;
      
//       onAddNote(newNote, imageUrl, audioUrl);
//       setNewNote("");
//       setSelectedImage(null);
//       setAudioBlob(null);
//     }
//   };

//   const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setSelectedImage(e.target.files[0]);
//     }
//   };

//   const startRecording = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
//       const mediaRecorder = new MediaRecorder(stream);
//       mediaRecorderRef.current = mediaRecorder;
//       audioChunksRef.current = [];

//       mediaRecorder.ondataavailable = (event) => {
//         if (event.data.size > 0) {
//           audioChunksRef.current.push(event.data);
//         }
//       };

//       mediaRecorder.onstop = () => {
//         const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
//         setAudioBlob(audioBlob);
        
//         // Stop all tracks to release the microphone
//         stream.getTracks().forEach(track => track.stop());
//       };

//       mediaRecorder.start();
//       setIsRecording(true);
//     } catch (error) {
//       console.error("Error accessing microphone:", error);
//     }
//   };

//   const stopRecording = () => {
//     if (mediaRecorderRef.current) {
//       mediaRecorderRef.current.stop();
//       setIsRecording(false);
//     }
//   };

//   return (
//     <Collapsible open={isOpen} onOpenChange={setIsOpen} className="mt-2">
//       <CollapsibleTrigger asChild>
//         <Button variant="ghost" size="sm" className="flex gap-1 text-muted-foreground">
//           <MessageSquare size={16} />
//           <span>{notes.length} {notes.length === 1 ? "Note" : "Notes"}</span>
//         </Button>
//       </CollapsibleTrigger>
      
//       <CollapsibleContent className="mt-2 space-y-3">
//         <div className="space-y-2">
//           {notes.length > 0 ? (
//             notes.map((note) => (
//               <div 
//                 key={note.id} 
//                 className="bg-accent p-3 rounded-lg relative animate-fade-in"
//               >
//                 <p className="text-sm">{note.text}</p>
                
//                 {note.imageUrl && (
//                   <div className="mt-2">
//                     <img 
//                       src={note.imageUrl} 
//                       alt="Note attachment" 
//                       className="max-h-40 rounded-md object-cover"
//                     />
//                   </div>
//                 )}
                
//                 {note.audioUrl && (
//                   <div className="mt-2">
//                     <audio 
//                       src={note.audioUrl} 
//                       controls 
//                       className="max-w-full h-8"
//                     />
//                   </div>
//                 )}
                
//                 <span className="text-xs text-muted-foreground block mt-1">
//                   {format(new Date(note.timestamp), "MMM d, yyyy 'at' h:mm a")}
//                 </span>
//               </div>
//             ))
//           ) : (
//             <p className="text-sm text-muted-foreground">No notes yet</p>
//           )}
//         </div>
        
//         <div className="space-y-2">
//           <Textarea
//             placeholder="Add a note..."
//             value={newNote}
//             onChange={(e) => setNewNote(e.target.value)}
//             className="min-h-[60px] text-sm"
//             onKeyDown={(e) => {
//               if (e.key === 'Enter' && e.ctrlKey) {
//                 handleAddNoteInternal();
//               }
//             }}
//           />
          
//           <div className="flex flex-wrap gap-2">
//             <input
//               type="file"
//               accept="image/*"
//               ref={fileInputRef}
//               onChange={handleImageSelect}
//               className="hidden"
//             />
            
//             <Button 
//               type="button"
//               onClick={() => fileInputRef.current?.click()}
//               variant="outline"
//               size="sm"
//               className="flex items-center"
//             >
//               <Image size={16} className="mr-1" /> {selectedImage ? 'Change Image' : 'Add Image'}
//             </Button>
            
//             {!isRecording ? (
//               <Button 
//                 type="button"
//                 onClick={startRecording}
//                 variant="outline"
//                 size="sm"
//                 className="flex items-center"
//               >
//                 <Mic size={16} className="mr-1" /> Record Audio
//               </Button>
//             ) : (
//               <Button 
//                 type="button"
//                 onClick={stopRecording}
//                 variant="outline"
//                 size="sm"
//                 className="flex items-center bg-red-100 text-red-500 hover:bg-red-200"
//               >
//                 <MicOff size={16} className="mr-1" /> Stop Recording
//               </Button>
//             )}
            
//             {selectedImage && (
//               <div className="text-xs text-muted-foreground flex items-center">
//                 {selectedImage.name}
//                 <Button 
//                   variant="ghost" 
//                   size="sm" 
//                   className="h-5 w-5 p-0 ml-1" 
//                   onClick={() => setSelectedImage(null)}
//                 >
//                   &times;
//                 </Button>
//               </div>
//             )}
            
//             {audioBlob && (
//               <div className="text-xs text-muted-foreground flex items-center">
//                 Audio recording
//                 <Button 
//                   variant="ghost" 
//                   size="sm" 
//                   className="h-5 w-5 p-0 ml-1" 
//                   onClick={() => setAudioBlob(null)}
//                 >
//                   &times;
//                 </Button>
//               </div>
//             )}
            
//             <Button 
//               onClick={handleAddNoteInternal}
//               className="ml-auto"
//               size="sm"
//             >
//               <PlusCircle size={16} className="mr-1" /> Add
//             </Button>
//           </div>
//         </div>
//       </CollapsibleContent>
//     </Collapsible>
//   );
// };

// export default EmbeddedTodoApp;





import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  Check, 
  Pencil, 
  Trash2, 
  Play, 
  Pause, 
  DollarSign, 
  PlusCircle, 
  MessageSquare, 
  Image, 
  Mic, 
  MicOff,
  Palette, 
  Loader2
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

// Import the API service
// Assuming this file exists in the correct path
import { ApiService } from "../services/api";

// Types
export type Priority = "low" | "medium" | "high";
export type SortOption = "Date added" | "Priority";
export type FilterOption = "All" | "Active" | "Completed";

export interface Note {
  id: string;
  text: string;
  timestamp: Date;
  type?: string;
  imageUrl?: string;
  audioUrl?: string;
}

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: Priority;
  createdAt: Date;
  notes: Note[];
  timerRunning: boolean;
  timerStartedAt?: Date;
  totalTimeSpent: number;
  costInCents: number;
  costPerSecond: number;
}

export interface TaskboardData {
  title: string;
  description: string;
  sort_by: SortOption;
  filter_by: FilterOption;
}

// Adapters for mapping between API and UI data models
const mapApiTaskToUiTask = (apiTask) => {
  return {
    id: apiTask.id,
    title: apiTask.title,
    completed: apiTask.status === "completed",
    priority: apiTask.priority.toLowerCase(),
    createdAt: new Date(apiTask.created_at),
    timerRunning: false,
    totalTimeSpent: parseTimeSpent(apiTask.time_spent),
    costInCents: Math.round(apiTask.cost * 100),
    costPerSecond: 1,
    notes: apiTask.notes.map(note => ({
      id: note.id,
      text: note.content,
      timestamp: new Date(note.created_at),
      type: note.type,
      imageUrl: note.type === "image" ? note.media_url : undefined,
      audioUrl: note.type === "audio" ? note.media_url : undefined
    }))
  };
};

const mapUiTaskToApiTask = (uiTask) => {
  return {
    id: uiTask.id,
    title: uiTask.title,
    status: uiTask.completed ? "completed" : "pending",
    priority: uiTask.priority.charAt(0).toUpperCase() + uiTask.priority.slice(1),
    cost: uiTask.costInCents / 100,
    time_spent: formatTimeSpentForApi(uiTask.totalTimeSpent)
  };
};

// Helper function to parse time spent string from API (format: "1h 30m 15s" or "45s")
const parseTimeSpent = (timeSpentStr) => {
  if (!timeSpentStr) return 0;
  
  let totalMs = 0;
  const hours = timeSpentStr.match(/(\d+)h/);
  const minutes = timeSpentStr.match(/(\d+)m/);
  const seconds = timeSpentStr.match(/(\d+)s/);
  
  if (hours) totalMs += parseInt(hours[1]) * 3600000;
  if (minutes) totalMs += parseInt(minutes[1]) * 60000;
  if (seconds) totalMs += parseInt(seconds[1]) * 1000;
  
  return totalMs;
};

// Helper function to format time spent for API
const formatTimeSpentForApi = (ms) => {
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const hours = Math.floor(ms / (1000 * 60 * 60));
  
  return hours > 0 
    ? `${hours}h ${minutes}m ${seconds}s`
    : minutes > 0 
      ? `${minutes}m ${seconds}s` 
      : `${seconds}s`;
};

const TaskboardApp = () => {
  // Main state
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [taskboardData, setTaskboardData] = useState({
    title: "Tasks Today",
    description: "Create a task, let's get it done!",
    sort_by: "Date added",
    filter_by: "All"
  });
  
  // UI state for task input
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("medium");
  const [themeColor, setThemeColor] = useState("pink");

  const { toast } = useToast();

  // Load tasks and taskboard data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const taskboard = await ApiService.getTaskboard();
        
        setTaskboardData({
          title: taskboard.title,
          description: taskboard.description,
          sort_by: taskboard.sort_by,
          filter_by: taskboard.filter_by
        });
        
        // Tasks are included in the taskboard response
        setTasks(taskboard.tasks.map(mapApiTaskToUiTask));
      } catch (error) {
        console.error("Error fetching data:", error);
        toast({
          title: "Error",
          description: "Failed to load tasks. Please try again later.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [toast]);

  // Task handlers
  const handleAddTask = async (e) => {
    if (e) e.preventDefault();
    
    if (title.trim()) {
      try {
        const newTaskData = {
          title: title,
          status: "pending",
          priority: priority.charAt(0).toUpperCase() + priority.slice(1),
          cost: 0,
          time_spent: "0s",
          notes: []
        };
        
        const createdTask = await ApiService.createTask(newTaskData);
        const uiTask = mapApiTaskToUiTask(createdTask);
        
        setTasks(prevTasks => [uiTask, ...prevTasks]);
        
        toast({
          title: "Task added",
          description: `"${title}" has been added to your list.`,
          duration: 2000
        });
        
        setTitle("");
        setPriority("medium");
      } catch (error) {
        console.error("Error adding task:", error);
        toast({
          title: "Error",
          description: "Failed to add task. Please try again.",
          variant: "destructive"
        });
      }
    }
  };

  const handleToggleComplete = async (id) => {
    try {
      const taskToUpdate = tasks.find(task => task.id === id);
      if (!taskToUpdate) return;
      
      // Create updated task for API
      const updatedApiTask = mapUiTaskToApiTask({
        ...taskToUpdate,
        completed: !taskToUpdate.completed
      });
      
      // Update task in API
      await ApiService.updateTask(updatedApiTask);
      
      // Update local state
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task.id === id 
            ? { ...task, completed: !task.completed } 
            : task
        )
      );
    } catch (error) {
      console.error("Error updating task:", error);
      toast({
        title: "Error",
        description: "Failed to update task status. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      const taskToDelete = tasks.find(task => task.id === id);
      if (!taskToDelete) return;
      
      await ApiService.deleteTask(id);
      
      setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
      
      toast({
        title: "Task deleted",
        description: `"${taskToDelete.title}" has been removed.`,
        duration: 2000
      });
    } catch (error) {
      console.error("Error deleting task:", error);
      toast({
        title: "Error",
        description: "Failed to delete task. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleEditTask = async (id, newTitle) => {
    try {
      const taskToUpdate = tasks.find(task => task.id === id);
      if (!taskToUpdate) return;
      
      // Create updated task with new title
      const updatedApiTask = mapUiTaskToApiTask({
        ...taskToUpdate,
        title: newTitle
      });
      
      await ApiService.updateTask(updatedApiTask);
      
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task.id === id 
            ? { ...task, title: newTitle } 
            : task
        )
      );
    } catch (error) {
      console.error("Error updating task:", error);
      toast({
        title: "Error",
        description: "Failed to update task. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleAddNote = async (id, text, imageFile, audioFile) => {
    try {
      const taskToUpdate = tasks.find(task => task.id === id);
      if (!taskToUpdate) return;
      
      let noteData = {
        content: text,
        type: "text"
      };
      
      // Handle image upload
      if (imageFile) {
        noteData = {
          content: text || "",
          type: "image",
          mediaFile: imageFile
        };
      }
      
      // Handle audio upload
      if (audioFile) {
        noteData = {
          content: text || "",
          type: "audio",
          mediaFile: audioFile
        };
      }
      
      const createdNote = await ApiService.addNote(id, noteData);
      
      // Map API note to UI note
      const uiNote = {
        id: createdNote.id,
        text: createdNote.content,
        timestamp: new Date(createdNote.created_at),
        type: createdNote.type,
        imageUrl: createdNote.type === "image" ? createdNote.media_url : undefined,
        audioUrl: createdNote.type === "audio" ? createdNote.media_url : undefined
      };
      
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === id
            ? { ...task, notes: [uiNote, ...task.notes] }
            : task
        )
      );

      toast({
        title: "Note added",
        description: "Your note has been added to the task.",
        duration: 2000
      });
    } catch (error) {
      console.error("Error adding note:", error);
      toast({
        title: "Error",
        description: "Failed to add note. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleToggleTimer = async (id) => {
    const taskToUpdate = tasks.find(task => task.id === id);
    if (!taskToUpdate || taskToUpdate.timerRunning) return;
    
    // Update local state first for immediate feedback
    setTasks(prevTasks =>
      prevTasks.map(task => {
        if (task.id !== id) return task;
        
        return {
          ...task,
          timerRunning: true,
          timerStartedAt: new Date()
        };
      })
    );
    
    // We don't update the API immediately for timer start
    // This will be handled when timer stops or when task is updated
  };

  const handleUpdateCost = async (id, costInCents) => {
    try {
      const taskToUpdate = tasks.find(task => task.id === id);
      if (!taskToUpdate) return;
      
      // Update task cost in API
      const updatedApiTask = mapUiTaskToApiTask({
        ...taskToUpdate,
        costInCents
      });
      
      await ApiService.updateTask(updatedApiTask);
      
      // Update local state
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === id
            ? { 
                ...task, 
                costInCents,
                costPerSecond: task.timerRunning ? task.costPerSecond : 1
              }
            : task
        )
      );
      
      toast({
        title: "Cost updated",
        description: "Task cost has been updated.",
        duration: 2000
      });
    } catch (error) {
      console.error("Error updating cost:", error);
      toast({
        title: "Error",
        description: "Failed to update task cost. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleUpdateTaskTime = async (id, totalTimeSpent, costInCents) => {
    try {
      const taskToUpdate = tasks.find(task => task.id === id);
      if (!taskToUpdate) return;
      
      // Update task time and cost in API
      const updatedApiTask = mapUiTaskToApiTask({
        ...taskToUpdate,
        totalTimeSpent,
        costInCents
      });
      
      await ApiService.updateTask(updatedApiTask);
      
      // Update local state is handled in the TaskItem component
    } catch (error) {
      console.error("Error updating task time:", error);
      toast({
        title: "Error",
        description: "Failed to update task time. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleUpdateTaskboard = async (newSettings) => {
    try {
      // Update API
      await ApiService.updateTaskboard({
        title: newSettings.title,
        description: newSettings.description,
        sort_by: newSettings.sort_by,
        filter_by: newSettings.filter_by
      });
      
      // Update local state
      setTaskboardData(newSettings);
      
      // Refresh tasks if filter changed
      if (newSettings.filter_by !== taskboardData.filter_by) {
        const taskboard = await ApiService.getTaskboard();
        setTasks(taskboard.tasks.map(mapApiTaskToUiTask));
      }
    } catch (error) {
      console.error("Error updating taskboard:", error);
      toast({
        title: "Error",
        description: "Failed to update taskboard settings. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Filter and sort tasks
  const filteredTasks = tasks.filter(task => {
    const filterBy = taskboardData.filter_by;
    if (filterBy === "All") return true;
    if (filterBy === "Active") return !task.completed;
    if (filterBy === "Completed") return task.completed;
    return true;
  });
  
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (taskboardData.sort_by === "Date added") {
      return b.createdAt.getTime() - a.createdAt.getTime();
    } else if (taskboardData.sort_by === "Priority") {
      const priorityWeight = { high: 3, medium: 2, low: 1 };
      return priorityWeight[b.priority] - priorityWeight[a.priority];
    }
    return 0;
  });
  
  const pendingTasksCount = tasks.filter(task => !task.completed).length;

  // Theme options
  const themes = [
    { name: "Pink", value: "pink", color: "bg-pink-500" }
  ];

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Loading tasks...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-16 p-4 sm:p-6">
      <header className="text-center mb-8 relative">
        <div className="absolute right-0 top-0">
          {/* Theme Selector Component */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="w-10 h-10">
                <Palette className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {themes.map((theme) => (
                <DropdownMenuItem
                  key={theme.value}
                  onClick={() => setThemeColor(theme.value)}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <span className={`h-4 w-4 rounded-full ${theme.color}`} />
                  {theme.name}
                  {themeColor === theme.value && (
                    <span className="ml-auto text-primary">✓</span>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <h1 className="text-3xl font-bold text-primary">{taskboardData.title}</h1>
        <p className="text-muted-foreground mt-2">{taskboardData.description}</p>
      </header>
      
      {/* Task Input Component */}
      <form onSubmit={handleAddTask} className="flex gap-2 mb-6">
        <Input
          placeholder="Add a new task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1"
        />
        
        <Select
          value={priority}
          onValueChange={(val) => setPriority(val)}
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
          </SelectContent>
        </Select>
        
        <Button type="submit" className="gap-2">
          <PlusCircle size={18} /> Add
        </Button>
      </form>
      
      {/* Task List Component */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2">
          <h2 className="text-lg font-medium">
            {pendingTasksCount === 0 
              ? "All tasks completed! 🎉" 
              : `${pendingTasksCount} task${pendingTasksCount === 1 ? "" : "s"} remaining`}
          </h2>
          
          <div className="flex gap-2 w-full sm:w-auto">
            <Select 
              value={taskboardData.filter_by} 
              onValueChange={(val) => handleUpdateTaskboard({...taskboardData, filter_by: val})}
            >
              <SelectTrigger className="w-full sm:w-[130px]">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            
            <Select 
              value={taskboardData.sort_by} 
              onValueChange={(val) => handleUpdateTaskboard({...taskboardData, sort_by: val})}
            >
              <SelectTrigger className="w-full sm:w-[130px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Date added">Date added</SelectItem>
                <SelectItem value="Priority">Priority</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {sortedTasks.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            {taskboardData.filter_by === "All" 
              ? "No tasks yet. Add your first task above!" 
              : taskboardData.filter_by === "Active" 
                ? "No active tasks. All done!" 
                : "No completed tasks yet."}
          </div>
        ) : (
          <div>
            {sortedTasks.map((task) => (
              <TaskItem 
                key={task.id} 
                task={task} 
                onToggleComplete={handleToggleComplete} 
                onDelete={handleDeleteTask}
                onEdit={handleEditTask}
                onAddNote={handleAddNote}
                onToggleTimer={handleToggleTimer}
                onUpdateCost={handleUpdateCost}
                onUpdateTaskTime={handleUpdateTaskTime}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default TaskboardApp;

// Task Item Component
const TaskItem = ({ 
  task, 
  onToggleComplete, 
  onDelete, 
  onEdit,
  onAddNote,
  onToggleTimer,
  onUpdateCost,
  onUpdateTaskTime
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [elapsedTime, setElapsedTime] = useState(task.totalTimeSpent);
  const [editingCost, setEditingCost] = useState(false);
  const [costValue, setCostValue] = useState(task.costInCents.toString());
  const [currentCost, setCurrentCost] = useState(task.costInCents);

  useEffect(() => {
    let interval;
    
    if (task.timerRunning) {
      interval = setInterval(() => {
        const startTime = task.timerStartedAt || new Date();
        const currentElapsed = task.totalTimeSpent + (new Date().getTime() - startTime.getTime());
        setElapsedTime(currentElapsed);
        
        // Calculate the current cost based on time elapsed
        const secondsElapsed = Math.floor(currentElapsed / 1000);
        const costPerSecond = task.costPerSecond || 1; // Default to 1 cent per second if not set
        const calculatedCost = task.costInCents + (secondsElapsed * costPerSecond);
        setCurrentCost(calculatedCost);
        
        // Update task time and cost in the API every 30 seconds
        if (secondsElapsed % 30 === 0) {
          onUpdateTaskTime(task.id, currentElapsed, calculatedCost);
        }
      }, 1000);
    } else {
      setElapsedTime(task.totalTimeSpent);
      setCurrentCost(task.costInCents);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [task.timerRunning, task.timerStartedAt, task.totalTimeSpent, task.costInCents, task.costPerSecond, task.id, onUpdateTaskTime]);
  
  const handleEditSubmit = () => {
    if (editedTitle.trim()) {
      onEdit(task.id, editedTitle);
    }
    setIsEditing(false);
  };

  const formatTime = (ms) => {
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const hours = Math.floor(ms / (1000 * 60 * 60));
    
    return hours > 0 
      ? `${hours}h ${minutes}m ${seconds}s`
      : minutes > 0 
        ? `${minutes}m ${seconds}s` 
        : `${seconds}s`;
  };

  const handleAddNoteToTask = (text, imageFile, audioFile) => {
    onAddNote(task.id, text, imageFile, audioFile);
  };

  const handleCostSubmit = () => {
    const cost = parseInt(costValue) || 0;
    onUpdateCost(task.id, cost);
    setEditingCost(false);
  };

  const formatCost = (cents) => {
    return `$${(cents / 100).toFixed(2)}`;
  };

  const priorityColor = {
    low: "bg-green-500",
    medium: "bg-yellow-500",
    high: "bg-red-500"
  }[task.priority];

  return (
    <div 
      className={cn(
        "task-item group flex flex-col gap-2 p-3 bg-white rounded-md shadow-sm border border-border mb-2 animate-fade-in relative",
        task.completed && "bg-muted/50"
      )}
    >
      <div className="flex items-center gap-2">
        {/* Priority indicator */}
        <div className={cn("h-4 w-1 rounded-full", priorityColor)} />
        
        <div className="flex-1 flex items-center gap-3">
          <Checkbox 
            className="task-checkbox h-5 w-5"
            checked={task.completed}
            onCheckedChange={() => onToggleComplete(task.id)}
          />
          
          {isEditing ? (
            <input
              className="flex-1 border-b border-primary/30 px-1 py-0.5 outline-none focus:border-primary"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              onBlur={handleEditSubmit}
              onKeyDown={(e) => e.key === 'Enter' && handleEditSubmit()}
              autoFocus
            />
          ) : (
            <span className={cn("flex-1", task.completed && "line-through text-muted-foreground")}>
              {task.title}
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {editingCost ? (
              <div className="flex items-center">
                <DollarSign size={14} className="text-muted-foreground" />
                <input 
                  type="number" 
                  className="w-16 h-6 px-1 text-xs border"
                  value={costValue}
                  onChange={(e) => setCostValue(e.target.value)}
                  onBlur={handleCostSubmit}
                  onKeyDown={(e) => e.key === 'Enter' && handleCostSubmit()}
                  autoFocus
                />
              </div>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                className="h-6 py-0 px-2 text-xs flex items-center gap-0.5 text-muted-foreground hover:text-primary"
                onClick={() => setEditingCost(true)}
              >
                <DollarSign size={14} />
                {formatCost(task.timerRunning ? currentCost : task.costInCents)}
              </Button>
            )}
          </div>
          
          <span className="text-xs text-muted-foreground whitespace-nowrap">
            {formatTime(elapsedTime)}
          </span>
          
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-primary"
            onClick={() => onToggleTimer(task.id)}
            disabled={task.timerRunning} // Cannot pause once timer is running
          >
            {task.timerRunning ? <Pause size={16} className="text-red-500" /> : <Play size={16} />}
          </Button>
          
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-muted-foreground hover:text-primary"
              onClick={() => {
                if (!isEditing) {
                  setIsEditing(true);
                } else {
                  handleEditSubmit();
                }
              }}
            >
              {isEditing ? <Check size={16} /> : <Pencil size={16} />}
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-muted-foreground hover:text-destructive"
              onClick={() => onDelete(task.id)}
            >
              <Trash2 size={16} />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Notes Component */}
      <NotesList 
        notes={task.notes} 
        onAddNote={handleAddNoteToTask}
      />
    </div>
  );
};

// Notes List Component (contained within TaskItem)
const NotesList = ({ 
  notes, 
  onAddNote 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newNote, setNewNote] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const fileInputRef = useRef(null);

  const handleAddNoteInternal = () => {
    if (newNote.trim() || selectedImage || audioBlob) {
      // Convert blob to file for API upload
      let imageFile = null;
      let audioFile = null;
      
      if (selectedImage) {
        imageFile = selectedImage;
      }
      
      if (audioBlob) {
        // Convert blob to file with proper name and type
        audioFile = new File([audioBlob], "audio-note.webm", { type: "audio/webm" });
      }
      
      onAddNote(newNote, imageFile, audioFile);
      setNewNote("");
      setSelectedImage(null);
      setAudioBlob(null);
    }
  };

  const handleImageSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        setAudioBlob(audioBlob);
        
        // Stop all tracks to release the microphone
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  }

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="mt-2">
      <CollapsibleTrigger asChild>
        <Button variant="ghost" size="sm" className="flex gap-1 text-muted-foreground">
          <MessageSquare size={16} />
          <span>{notes.length} {notes.length === 1 ? "Note" : "Notes"}</span>
        </Button>
      </CollapsibleTrigger>
      
      <CollapsibleContent className="mt-2 space-y-3">
        <div className="space-y-2">
          {notes.length > 0 ? (
            notes.map((note) => (
              <div 
                key={note.id} 
                className="bg-accent p-3 rounded-lg relative animate-fade-in"
              >
                <p className="text-sm">{note.text}</p>
                
                {note.imageUrl && (
                  <div className="mt-2">
                    <img 
                      src={note.imageUrl} 
                      alt="Note attachment" 
                      className="max-h-40 rounded-md object-cover"
                    />
                  </div>
                )}
                
                {note.audioUrl && (
                  <div className="mt-2">
                    <audio 
                      src={note.audioUrl} 
                      controls 
                      className="max-w-full h-8"
                    />
                  </div>
                )}
                
                <span className="text-xs text-muted-foreground block mt-1">
                  {format(new Date(note.timestamp), "MMM d, yyyy 'at' h:mm a")}
                </span>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">No notes yet</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Textarea
            placeholder="Add a note..."
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            className="min-h-[60px] text-sm"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.ctrlKey) {
                handleAddNoteInternal();
              }
            }}
          />
          
          <div className="flex flex-wrap gap-2">
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageSelect}
              className="hidden"
            />
            
            <Button 
              type="button"
              onClick={() => fileInputRef.current?.click()}
              variant="outline"
              size="sm"
              className="flex items-center"
            >
              <Image size={16} className="mr-1" /> {selectedImage ? 'Change Image' : 'Add Image'}
            </Button>
            
            {!isRecording ? (
              <Button 
                type="button"
                onClick={startRecording}
                variant="outline"
                size="sm"
                className="flex items-center"
              >
                <Mic size={16} className="mr-1" /> Record Audio
              </Button>
            ) : (
              <Button 
                type="button"
                onClick={stopRecording}
                variant="outline"
                size="sm"
                className="flex items-center bg-red-100 text-red-500 hover:bg-red-200"
              >
                <MicOff size={16} className="mr-1" /> Stop Recording
              </Button>
            )}
            
            {selectedImage && (
              <div className="text-xs text-muted-foreground flex items-center">
                {selectedImage.name}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-5 w-5 p-0 ml-1" 
                  onClick={() => setSelectedImage(null)}
                >
                  &times;
                </Button>
              </div>
            )}
            
            {audioBlob && (
              <div className="text-xs text-muted-foreground flex items-center">
                Audio recording
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-5 w-5 p-0 ml-1" 
                  onClick={() => setAudioBlob(null)}
                >
                  &times;
                </Button>
              </div>
            )}
            
            <Button 
              onClick={handleAddNoteInternal}
              className="ml-auto"
              size="sm"
            >
              <PlusCircle size={16} className="mr-1" /> Add
            </Button>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}