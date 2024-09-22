'use client'
import { type DocumentSnapshot, doc, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '~/lib/firebase'
import { Text } from '@mantine/core'
import {
  NEXT_PUBLIC_FIREBASE_COLLECTION_ID,
  NEXT_PUBLIC_FIREBASE_DOCUMENT_ID
} from '~/util/env'

export const ImageCounts = () => {
  const [count, setCount] = useState<number>(0)
  useEffect(() => {
    if (
      !NEXT_PUBLIC_FIREBASE_COLLECTION_ID ||
      !NEXT_PUBLIC_FIREBASE_DOCUMENT_ID
    ) {
      console.error('Firebase collection ID or document ID is not defined')
      return
    }
    // ドキュメント参照の作成
    const docRef = doc(
      db,
      NEXT_PUBLIC_FIREBASE_COLLECTION_ID,
      NEXT_PUBLIC_FIREBASE_DOCUMENT_ID
    )
    // ドキュメントの監視
    const unsubscribe = onSnapshot(docRef, (docSnap: DocumentSnapshot) => {
      if (docSnap.exists()) {
        // ドキュメントが存在する場合、countフィールドの値を表示
        setCount(docSnap.data().count)
      } else {
        // ドキュメントが存在しない場合の処理
        console.log('No such document!')
      }
    })
    return () => {
      unsubscribe()
    }
  }, [])
  return (
    <Text ta="center" c="gray.6" size="xs" fw={700}>
      画像生成数合計：{count}
    </Text>
  )
}
