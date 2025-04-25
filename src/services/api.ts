// // src/services/api.js
// const API_BASE_URL = 'http://localhost:8080/api';

// export const ApiService = {
//   // Task operations
//   async getAllTasks(filter = '') {
//     const url = filter ? `${API_BASE_URL}/tasks?filter=${filter}` : `${API_BASE_URL}/tasks`;
//     const response = await fetch(url);
//     if (!response.ok) throw new Error('Failed to fetch tasks');
//     return response.json();
//   },

//   async getTask(id) {
//     const response = await fetch(`${API_BASE_URL}/tasks/${id}`);
//     if (!response.ok) throw new Error('Failed to fetch task');
//     return response.json();
//   },

//   async createTask(task) {
//     const response = await fetch(`${API_BASE_URL}/tasks`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(task),
//     });
//     if (!response.ok) throw new Error('Failed to create task');
//     return response.json();
//   },

//   async updateTask(task) {
//     const response = await fetch(`${API_BASE_URL}/tasks/${task.id}`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(task),
//     });
//     if (!response.ok) throw new Error('Failed to update task');
//     return response.json();
//   },

//   async deleteTask(id) {
//     const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
//       method: 'DELETE',
//     });
//     if (!response.ok) throw new Error('Failed to delete task');
//     return true;
//   },

//   // Note operations
//   async addNote(taskId, note) {
//     // Handle different note types (text, image, audio)
//     let response;
    
//     if (note.type === 'text') {
//       // For text notes, send as JSON
//       response = await fetch(`${API_BASE_URL}/tasks/${taskId}/notes`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           content: note.content,
//           type: note.type
//         }),
//       });
//     } else {
//       // For image/audio notes, use FormData
//       const formData = new FormData();
//       formData.append('type', note.type);
//       formData.append('content', note.content || '');
      
//       if (note.mediaFile) {
//         formData.append('media', note.mediaFile);
//       }
      
//       response = await fetch(`${API_BASE_URL}/tasks/${taskId}/notes`, {
//         method: 'POST',
//         body: formData,
//       });
//     }
    
//     if (!response.ok) throw new Error('Failed to add note');
//     return response.json();
//   },

//   async updateNote(note) {
//     let response;
    
//     if (note.type === 'text' || !note.mediaFile) {
//       response = await fetch(`${API_BASE_URL}/notes/${note.id}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           content: note.content,
//           type: note.type
//         }),
//       });
//     } else {
//       const formData = new FormData();
//       formData.append('type', note.type);
//       formData.append('content', note.content || '');
      
//       if (note.mediaFile) {
//         formData.append('media', note.mediaFile);
//       }
      
//       response = await fetch(`${API_BASE_URL}/notes/${note.id}`, {
//         method: 'PUT',
//         body: formData,
//       });
//     }
    
//     if (!response.ok) throw new Error('Failed to update note');
//     return response.json();
//   },

//   async deleteNote(id) {
//     const response = await fetch(`${API_BASE_URL}/notes/${id}`, {
//       method: 'DELETE',
//     });
//     if (!response.ok) throw new Error('Failed to delete note');
//     return true;
//   },

//   // Taskboard operations
//   async getTaskboard() {
//     const response = await fetch(`${API_BASE_URL}/taskboard`);
//     if (!response.ok) throw new Error('Failed to fetch taskboard');
//     return response.json();
//   },

//   async updateTaskboard(taskboard) {
//     const response = await fetch(`${API_BASE_URL}/taskboard`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(taskboard),
//     });
//     if (!response.ok) throw new Error('Failed to update taskboard');
//     return true;
//   }
// };



// src/services/api.ts
const API_BASE_URL = 'http://localhost:8080/api';

export const ApiService = {
  // Task operations
  async getAllTasks(filter = '') {
    const url = filter ? `${API_BASE_URL}/tasks?filter=${filter}` : `${API_BASE_URL}/tasks`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      // Include credentials if you need to send cookies
      // credentials: 'include',
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch tasks: ${errorText}`);
    }
    
    return response.json();
  },

  async getTask(id: string) {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch task: ${errorText}`);
    }
    
    return response.json();
  },

  async createTask(task: any) {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(task),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to create task: ${errorText}`);
    }
    
    return response.json();
  },

  async updateTask(task: any) {
    const response = await fetch(`${API_BASE_URL}/tasks/${task.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(task),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to update task: ${errorText}`);
    }
    
    return response.json();
  },

  async deleteTask(id: string) {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to delete task: ${errorText}`);
    }
    
    return true;
  },

  // Note operations
  async addNote(taskId: string, note: any) {
    let response;
    
    if (note.type === 'text') {
      // For text notes, send as JSON
      response = await fetch(`${API_BASE_URL}/tasks/${taskId}/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          content: note.content,
          type: note.type
        }),
      });
    } else {
      // For image/audio notes, use FormData
      const formData = new FormData();
      formData.append('type', note.type);
      formData.append('content', note.content || '');
      
      if (note.mediaFile) {
        formData.append('media', note.mediaFile);
      }
      
      response = await fetch(`${API_BASE_URL}/tasks/${taskId}/notes`, {
        method: 'POST',
        body: formData,
      });
    }
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to add note: ${errorText}`);
    }
    
    return response.json();
  },

  async updateNote(note: any) {
    let response;
    
    if (note.type === 'text' || !note.mediaFile) {
      response = await fetch(`${API_BASE_URL}/notes/${note.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          content: note.content,
          type: note.type
        }),
      });
    } else {
      const formData = new FormData();
      formData.append('type', note.type);
      formData.append('content', note.content || '');
      
      if (note.mediaFile) {
        formData.append('media', note.mediaFile);
      }
      
      response = await fetch(`${API_BASE_URL}/notes/${note.id}`, {
        method: 'PUT',
        body: formData,
      });
    }
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to update note: ${errorText}`);
    }
    
    return response.json();
  },

  async deleteNote(id: string) {
    const response = await fetch(`${API_BASE_URL}/notes/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to delete note: ${errorText}`);
    }
    
    return true;
  },

  // Taskboard operations
  async getTaskboard() {
    try {
      const response = await fetch(`${API_BASE_URL}/taskboard`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch taskboard: ${errorText}`);
      }
      
      return response.json();
    } catch (error) {
      console.error("API Error in getTaskboard:", error);
      throw error;
    }
  },

  async updateTaskboard(taskboard: any) {
    const response = await fetch(`${API_BASE_URL}/taskboard`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(taskboard),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to update taskboard: ${errorText}`);
    }
    
    return true;
  },

  // Diagnostic endpoint to test CORS
  async ping() {
    const response = await fetch(`${API_BASE_URL}/ping`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to ping API');
    }
    
    return response.json();
  }
};