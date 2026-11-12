# दोस्तों का चैट (Dosto ka Chat) - Backend & Database Guide

इस प्रोजेक्ट में **Firebase Realtime Database** और **Standalone Notification System (v1.0)** का उपयोग किया गया है।

---

## 1. Firebase Realtime Database Setup (3 आसान स्टेप्स)

1. **Firebase Console** में जाएं: [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. नया प्रोजेक्ट बनाएं (या मौजूदा प्रोजेक्ट चुनें) -> **Build** -> **Realtime Database** -> **Create Database**.
3. **Rules** टैब में जाकर `firebase.rules.json` के नियम पेस्ट करके **Publish** कर दें।
4. **Project Settings** -> **General** -> **Your apps** -> **Web (</>)** से अपनी Firebase Config कॉपी करें और ऐप के **Settings (⚙️)** मेनू में पेस्ट करें।

---

## 2. Realtime Database Data Structure (Schema)

| Path | Description | Fields Example |
|------|-------------|----------------|
| `messages/{msgId}` | सार्वजनिक ग्रुप चैट | `{ uid, username, text, voice, ts }` |
| `dmRequests/{myUid}/{senderUid}` | पेंडिंग DM/फ्रेंड रिक्वेस्ट | `{ fromName, username, ts }` |
| `dmFriends/{myUid}/{friendUid}` | कन्फर्म्ड दोस्तों की सूची | `{ name, username, avatar }` |
| `dmThreads/{pairId}/messages/{msgId}` | 1-ऑन-1 पर्सनल चैट (`pairId = uid1__uid2`) | `{ uid, name, text, voice, ts, unsent }` |
| `presence/{uid}` | यूजर का लाइव ऑनलाइन स्टेटस | `{ online: true, state: 'online', username }` |
| `stories/{storyId}` | 24-घंटे वाली स्टोरीज़ | `{ uid, username, text, media, ts }` |

---

## 3. How `notifications.js` works automatically
- **Group Chat**: किसी का नया मैसेज आने पर `pushAlert` और ऑडियो चाइम बजाता है।
- **DM Requests**: बेल आइकन (`#notifBell`) पर अनरीड काउंट बैज लगाता है और नोटिफिकेशन दिखाता है।
- **DM Threads**: पर्सनल मैसेज आने पर `.dm-launcher` पर अनरीड काउंटर बढ़ाता है।
- **Presence**: जब कोई दोस्त ऑनलाइन आता है, तो "🟢 Online Now" अलर्ट दिखाता है।
- **Stories**: नई स्टोरी आने पर `[data-feature="stories"]` पर लाल डॉट बैज दिखाता है।
- **Audio Chime**: Web Audio API से बिना किसी एक्सटर्नल MP3 फाइल के सुरीली चाइम टोन बजाता है।
- **Service Worker / Push**: ऐप बैकग्राउंड में होने पर ब्राउज़र सिस्टम नोटिफिकेशन भेजता है।
