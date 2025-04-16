package com.capstone_frontend

import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.app.Service
import android.content.Context
import android.content.Intent
import android.content.ServiceConnection
import android.os.IBinder
import android.os.RemoteException
import android.util.Log
import androidx.core.app.NotificationCompat
import org.altbeacon.beacon.*

class BeaconBackgroundService : Service(), BeaconConsumer {

    private lateinit var beaconManager: BeaconManager
    
    override fun onBind(intent: Intent?): IBinder? {
        Log.d("BeaconService", "onBind")
        return null
    }

    companion object {
//        val IBEACON_LAYOUT = BeaconParser().setBeaconLayout("m:2-3=0215,i:4-19,i:20-21,i:22-23,p:24-24")
        const val CHANNEL_ID = "BeaconServiceChannel"
    }

    override fun onCreate() {
        Log.d("BeaconService", "onCreate")
        super.onCreate()
        // BeaconManager 초기화
        beaconManager = BeaconManager.getInstanceForApplication(this)
        // 비콘 탐색 시작
        startBeaconScanning()
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        Log.d("BeaconService", "onStartCommand1")
        // 백그라운드 서비스를 시작할 때는 startForegroundService()를 사용합니다.
        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O) {
            Log.d("BeaconService", "onStartCommand2")
            startForegroundService(Intent(this, BeaconBackgroundService::class.java))
        } else {
            Log.d("BeaconService", "onStartCommand3")
            startService(Intent(this, BeaconBackgroundService::class.java))
        }

        // 비콘 탐색을 시작하는 코드를 여기에 작성
        startBeaconScanning()
        // 서비스가 강제로 종료되더라도 시스템이 자동으로 재시작하도록 설정
        return START_STICKY
    }

    private fun startBeaconScanning() {
        Log.d("BeaconService", "startBeaconScanning")
        // 비콘 탐색을 시작하는 코드를 여기에 작성
//        beaconManager.beaconParsers.add(BeaconParser().setBeaconLayout("m:2-3=0215,i:4-19,i:20-21,i:22-23,p:24-24"))
//        beaconManager.beaconParsers.add(BeaconParser().setBeaconLayout(BeaconParser.ALTBEACON_LAYOUT))
        beaconManager.bind(this)
    }

    override fun onDestroy() {
        super.onDestroy()
        beaconManager.unbind(this)
    }

    override fun onBeaconServiceConnect() {
        Log.d("BeaconService", "onBeaconServiceConnect")

        beaconManager.addMonitorNotifier(object : MonitorNotifier {
            override fun didEnterRegion(region: Region) {
                // 비콘이 감지되었을 때의 처리
                showNotification("Beacon detected", "A beacon is in range.")
                Log.d("BeaconService", "Beacon detected in region: $region")
            }

            override fun didExitRegion(region: Region) {
                // 비콘이 사라졌을 때의 처리
                showNotification("Beacon lost", "A beacon is out of range.")
                Log.d("BeaconService", "Beacon lost in region: $region")
            }

            override fun didDetermineStateForRegion(state: Int, region: Region) {
                // 비콘 상태가 변경되었을 때의 처리
                Log.d("BeaconService", "State changed to $state in region: $region")
            }
        })

        beaconManager.addRangeNotifier { beacons, region ->
            beacons?.forEach { beacon ->
                Log.d("BeaconService", "UUID: ${beacon.id1}, Major: ${beacon.id2}, Minor: ${beacon.id3}, Distance: ${beacon.distance}")
            }
        }
        
        try {
            beaconManager.startMonitoringBeaconsInRegion(Region("unique-id", null, null, null))
            beaconManager.startRangingBeaconsInRegion(Region("unique-id", null, null, null))
        } catch (e: RemoteException) {
            e.printStackTrace()
        }
        
    }

    private fun showNotification(title: String, message: String) {
        android.util.Log.d("BeaconService","showNotification")
        val notificationManager = getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
        val notification: Notification = NotificationCompat.Builder(this, CHANNEL_ID)
            .setContentTitle(title)
            .setContentText(message)
            // .setSmallIcon(R.drawable.ic_launcher)
            .build()
        notificationManager.notify(2, notification)
    }

    private fun createNotificationChannel() {
        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O) {
            val serviceChannel = NotificationChannel(
                CHANNEL_ID,
                "Beacon Service Channel",
                NotificationManager.IMPORTANCE_DEFAULT
            )
            val manager = getSystemService(NotificationManager::class.java)
            manager.createNotificationChannel(serviceChannel)
        }
    }

    override fun getApplicationContext(): Context {
        return applicationContext
    }

    override fun unbindService(conn: ServiceConnection) {
        applicationContext.unbindService(conn)
    }

    override fun bindService(intent: Intent, conn: ServiceConnection, flags: Int): Boolean {
        return applicationContext.bindService(intent, conn, flags)
    }
}
