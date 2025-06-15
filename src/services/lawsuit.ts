import { db, storage } from '@/lib/firebase'
import { collection, addDoc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { LawsuitForm } from '@/types/lawsuit'

export async function submitLawsuitApplication(formData: LawsuitForm) {
  try {
    // 1. 파일 업로드
    const uploadedFiles: Record<string, string> = {}
    
    for (const [key, file] of Object.entries(formData.documents)) {
      if (file) {
        const storageRef = ref(storage, `lawsuit-documents/${Date.now()}-${file.name}`)
        await uploadBytes(storageRef, file)
        const downloadURL = await getDownloadURL(storageRef)
        uploadedFiles[key] = downloadURL
      }
    }

    // 2. Firestore에 데이터 저장
    const docRef = await addDoc(collection(db, 'lawsuit-applications'), {
      ...formData,
      documents: uploadedFiles,
      status: 'pending',
      createdAt: new Date().toISOString(),
    })

    return { success: true, id: docRef.id }
  } catch (error) {
    console.error('Error submitting lawsuit application:', error)
    throw error
  }
} 