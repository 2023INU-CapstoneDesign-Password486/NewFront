package com.capstone_frontend

import com.google.firebase.messaging.FirebaseMessagingService
import com.google.firebase.messaging.RemoteMessage


class MyFirebaseMessagingService : FirebaseMessagingService() {
    override fun onMessageReceived(remoteMessage: RemoteMessage) {
        super.onMessageReceived(remoteMessage)

        remoteMessage.notification?.let {
            // 알림 메시지가 있는 경우
            val title = it.title
            val body = it.body
            // 알림을 생성하고 표시하는 코드 작성
        }

        // 데이터 페이로드가 있는 경우
        remoteMessage.data.isNotEmpty().let {
            // 데이터 처리 코드 작성
        }
    }
}
