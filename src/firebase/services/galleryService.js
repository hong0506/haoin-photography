import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../config';

/**
 * 上传图片到 Firebase Storage
 * @param {File} file - 图片文件
 * @param {string} folder - 存储文件夹（如 'gallery', 'stories'）
 * @returns {Promise<string>} - 图片URL
 */
export async function uploadImage(file, folder = 'gallery') {
  try {
    const timestamp = Date.now();
    const fileName = `${timestamp}_${file.name}`;
    const storageRef = ref(storage, `${folder}/${fileName}`);
    
    // 上传文件
    const snapshot = await uploadBytes(storageRef, file);
    
    // 获取下载URL
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return downloadURL;
  } catch (error) {
    console.error('图片上传失败:', error);
    throw error;
  }
}

/**
 * 创建新作品
 * @param {Object} photoData - 作品数据
 * @returns {Promise<Object>} - 创建的作品信息
 */
export async function createPhoto(photoData) {
  try {
    const docRef = await addDoc(collection(db, 'gallery'), {
      ...photoData,
      createdAt: new Date(),
      updatedAt: new Date(),
      views: 0,
      likes: 0,
      isPublished: photoData.isPublished ?? true
    });
    
    return { id: docRef.id, ...photoData };
  } catch (error) {
    console.error('创建作品失败:', error);
    throw error;
  }
}

/**
 * 获取所有作品
 * @param {Object} filters - 过滤条件
 * @returns {Promise<Array>} - 作品列表
 */
export async function getPhotos(filters = {}) {
  try {
    let q = collection(db, 'gallery');
    
    // 应用过滤条件
    if (filters.category) {
      q = query(q, where('category', '==', filters.category));
    }
    
    if (filters.isFeatured) {
      q = query(q, where('isFeatured', '==', true));
    }
    
    if (filters.isPublished !== false) {
      q = query(q, where('isPublished', '==', true));
    }
    
    // 排序
    q = query(q, orderBy('createdAt', 'desc'));
    
    const querySnapshot = await getDocs(q);
    const photos = [];
    
    querySnapshot.forEach((doc) => {
      photos.push({ id: doc.id, ...doc.data() });
    });
    
    return photos;
  } catch (error) {
    console.error('获取作品失败:', error);
    throw error;
  }
}

/**
 * 更新作品
 * @param {string} id - 作品ID
 * @param {Object} updates - 更新数据
 * @returns {Promise<void>}
 */
export async function updatePhoto(id, updates) {
  try {
    const docRef = doc(db, 'gallery', id);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: new Date()
    });
  } catch (error) {
    console.error('更新作品失败:', error);
    throw error;
  }
}

/**
 * 删除作品
 * @param {string} id - 作品ID
 * @param {string} imageUrl - 图片URL（用于删除Storage中的文件）
 * @returns {Promise<void>}
 */
export async function deletePhoto(id, imageUrl) {
  try {
    // 删除 Firestore 文档
    await deleteDoc(doc(db, 'gallery', id));
    
    // 删除 Storage 中的图片（可选）
    if (imageUrl) {
      try {
        const imageRef = ref(storage, imageUrl);
        await deleteObject(imageRef);
      } catch (storageError) {
        console.warn('删除Storage文件失败（可能已被删除）:', storageError);
      }
    }
  } catch (error) {
    console.error('删除作品失败:', error);
    throw error;
  }
}

/**
 * 完整的上传流程：上传图片 + 创建作品记录
 * @param {File} imageFile - 图片文件
 * @param {Object} metadata - 作品元数据
 * @returns {Promise<Object>} - 创建的作品信息
 */
export async function uploadPhotoWithMetadata(imageFile, metadata) {
  try {
    // 1. 上传图片
    const imageUrl = await uploadImage(imageFile, 'gallery');
    
    // 2. 创建作品记录
    const photo = await createPhoto({
      ...metadata,
      imageUrl
    });
    
    return photo;
  } catch (error) {
    console.error('上传流程失败:', error);
    throw error;
  }
}
