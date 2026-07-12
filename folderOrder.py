"""
src/
├── components/
│   ├── layout/               <-- Componentes de estructura
│   │   └── TopBar/
│   │       └── TopBar.tsx
|   |
│   ├── Logo/
│   │   └── Logo.tsx    <-- UI pura
|   |
│   └── SearchBar/
│       └── SearchBar.tsx   <-- UI pura (input y lista desplegable)
│
├── context/
│   └── AuthContext.tsx <-- Solo guarda el estado del usuario (isLogged, etc.)
│
├── features/
│   ├── auth/
│   |   ├── api/
│   |   │   └── authApi.ts          <-- Maneja: login(), register(), forgotPassword(), resetPassword()
|   |   |
│   |   ├── hooks/
│   |   │   ├── useLogin.ts         <-- Actualiza context y redirige
│   |   │   ├── useRegister.ts      <-- Actualiza context (auto-login) y redirige
│   |   │   ├── useForgotPassword.ts<-- Solo muestra mensaje de éxito ("Correo enviado")
│   |   │   └── useResetPassword.ts <-- Lee el token de la URL, envía nueva clave, redirige al login
│   |   │
│   |   └── components/
│   |       ├── Login.tsx           <-- Formulario UI
│   |       ├── Register.tsx        <-- Formulario UI
│   |       ├── ForgotPassword.tsx  <-- UI: Solo pide el Email
│   |       └── ResetPassword.tsx   <-- UI: Pide Nueva Contraseña. Consume useResetPassword()
│   │
│   ├── account/             <-- Gestionar la cuenta
│   |   ├── api/
│   |   │   └── accountApi.ts         <-- updateProfile(), changePassword(), updatePrivacy()
|   |   |
│   |   ├── hooks/
│   |   │   ├── useUpdateProfile.ts   <-- Llama a la API y actualiza el AuthContext si el nombre/foto cambia
│   |   │   └── useChangePassword.ts
|   |   |  
│   |   └── components/
│   |       ├── ProfileForm.tsx       <-- Formulario para Nombre y Email
│   |       ├── ChangePasswordForm.tsx<-- Formulario para cambiar contraseña
│   |       └── PrivacySettings.tsx   <-- Opciones de privacidad
│   |
│   ├── bookmarks/             
│   |   ├── api/
│   |   │   └── bookmarksApi.ts    <-- getBookmarks(), toggleBookmark()
|   |   |
│   |   ├── storage/                
│   |   │   └── localBookmarks.ts   <-- getLocalBookmarks(), saveLocalBookmark(), clearLocalBookmarks()
│   |   │
│   |   ├── hooks/
│   |   │   └── useBookmarks.ts    <-- Decide si usa api/ o storage/ dependiendo del AuthContext
│   |   │
│   |   └── components/
│   |       ├── BookmarkButton.tsx <-- Usa <StarIcon /> + useBookmarks(). Sabe a qué item pertenece.
│   |       ├── BookmarkList.tsx   <-- Muestra la lista de todos los elementos guardados.
│   |       └── BookmarkFolder.tsx <-- Si permites crear carpetas/colecciones.
|   |
│   └── search/
│       ├── api/
│       │   └── searchApi.ts        <-- fetch('/api/search?q=...'), fetch('/api/history')
│       │
│       ├── storage/
│       │   └── localSearch.ts      <-- localStorage.setItem('history')
│       │
│       ├── hooks/
│       │   └── useSearch.ts        <-- Orquesta: Decide storage vs API, y hace el fetch de resultados
│       │
│       └── components/             <-- Componentes específicos de la feature
│           ├── SearchResultsList.tsx <-- Recorre los resultados y pinta los items
│           └── SearchResultItem.tsx  <-- Un resultado individual (título, link, descripción)
|
├── pages/
│   │   // -- PÁGINAS PÚBLICAS --
│   ├── HomePage.tsx               <-- /
│   ├── SearchResultsPage.tsx      <-- /search?q=...
│   │
│   │   // -- PÁGINAS DE AUTENTICACIÓN --
│   ├── LoginPage.tsx              <-- /login (Importa <Login /> de auth)
│   ├── RegisterPage.tsx           <-- /register (Importa <Register /> de auth)
│   ├── ForgotPasswordPage.tsx     <-- /forgot-password
│   ├── ResetPasswordPage.tsx      <-- /reset-password
│   │
│   │   // -- PÁGINAS PRIVADAS (Requieren estar logeado) --
│   ├── SettingsPage.tsx           <-- /settings (Importa componentes de account)
│   └── SavedItemsPage.tsx         <-- /bookmarks (Importa <BookmarkList />)
│
├── router/ 
│   └── AppRouter.tsx   <-- Asigna URLs a las Pages
|
├── lib/                 <-- Librerías de terceros configuradas
│   └── axios.ts         <-- Configuración base, interceptores y tokens
│
├── utils/               <-- Funciones matemáticas, de texto o fechas
│   └── validators.ts    <-- Ej: isValidEmail(email)
│
├── types/               <-- Interfaces globales de TypeScript
│   └── index.ts
│
├── App.tsx  
└── main.tsx
"""