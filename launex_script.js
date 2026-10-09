document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // 1. FITUR SEMBUNYIKAN/LIHAT PASSWORD (Password Toggle)
    // ==========================================
    const passwordInput = document.getElementById('password');
    const passwordToggle = document.getElementById('password-toggle');

    if (passwordToggle && passwordInput) {
        passwordToggle.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            if (type === 'password') {
                passwordToggle.classList.remove('fa-eye-slash');
                passwordToggle.classList.add('fa-eye');
                passwordToggle.style.color = '#ccc';
            } else {
                passwordToggle.classList.remove('fa-eye');
                passwordToggle.classList.add('fa-eye-slash');
                passwordToggle.style.color = '#777';
            }
        });
    }

    // ==========================================
    // 2. TOMBOL GOOGLE SIGN-IN
    // ==========================================
    const googleBtn = document.querySelector('.google-signin-btn');
    if (googleBtn) {
        googleBtn.addEventListener('click', function() {
            console.log('Google Sign-In clicked');
            alert('Simulation: Open Google Sign-In pop-up');
        });
    }

    // ==========================================
    // 3. PROSES LOGIN TEMBUS DASHBOARD
    // ==========================================
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault(); 

            const usernameInput = document.getElementById('email-phone').value;
            const passwordInput = document.getElementById('password').value;

            const registeredUser = localStorage.getItem('launexUser');
            const registeredPass = localStorage.getItem('launexPass');

            // Jika login pakai akun default Angela
            if (usernameInput === "angela@gmail.com" && passwordInput === "angela123") {
                localStorage.setItem('launexUser', usernameInput);
                // Kembalikan foto profil ke default Angela
                localStorage.setItem('launexAvatar', 'asset/angela.jpg');
                alert('Login Berhasil! Selamat Datang Angela.');
                window.location.href = 'dashboard.html';
            } 
            // Jika login pakai akun hasil register (seperti budi)
            else if (usernameInput === registeredUser && passwordInput === registeredPass) {
                localStorage.setItem('launexUser', usernameInput);
                // Jika user yang register belum punya foto khusus, hapus memory foto agar kembali ke default akun tersebut
                if (!localStorage.getItem('launexAvatar_' + usernameInput)) {
                    localStorage.removeItem('launexAvatar');
                } else {
                    localStorage.setItem('launexAvatar', localStorage.getItem('launexAvatar_' + usernameInput));
                }
                alert('Login Berhasil! Selamat Datang Kembali.');
                window.location.href = 'dashboard.html'; 
            } else {
                alert('Username atau Password salah! Gunakan akun register atau akun demo Angela.');
            }
        });
    }

    // ==========================================
    // 4. PROSES REGISTER LANGSUNG TEMBUS DASHBOARD
    // ==========================================
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault(); 
            
            const usernameInput = document.getElementById('reg-username').value;
            const passwordInput = document.getElementById('reg-password').value;

            localStorage.setItem('launexUser', usernameInput);
            localStorage.setItem('launexPass', passwordInput);
            
            // Hapus foto lama milik user sebelumnya agar user baru pakai foto default dulu
            localStorage.removeItem('launexAvatar');

            alert('Akun Berhasil Dibuat! Mengalihkan langsung ke Dashboard...');
            window.location.href = 'dashboard.html'; 
        });
    }

    // ==========================================
    // 5. MENGGANTI NAMA & FOTO DI DASHBOARD SECARA OTOMATIS
    // ==========================================
    const savedUser = localStorage.getItem('launexUser');
    if (savedUser) {
        const displayName = savedUser.split('@')[0];
        
        const sidebarName = document.getElementById('sidebar-name');
        const welcomeName = document.getElementById('welcome-name');
        
        if (sidebarName) sidebarName.textContent = displayName;
        if (welcomeName) welcomeName.innerHTML = `Halo, ${displayName} 👋`;
    }

    // Load foto profil yang sesuai
    const userAvatarImg = document.getElementById('user-avatar-img');
    const savedAvatar = localStorage.getItem('launexAvatar');
    if (userAvatarImg) {
        if (savedAvatar) {
            userAvatarImg.src = savedAvatar;
        } else {
            // Jika tidak ada foto di memori, kembalikan ke gambar default asset/angela.jpg
            userAvatarImg.src = 'asset/angela.jpg';
        }
    }

    // ==========================================
    // 6. FITUR UPLOAD FOTO PROFIL
    // ==========================================
    const avatarWrapper = document.querySelector('.avatar-wrapper');
    const avatarUpload = document.getElementById('avatar-upload');

    if (avatarWrapper && avatarUpload) {
        avatarWrapper.addEventListener('click', function() {
            avatarUpload.click();
        });
    }

    if (avatarUpload && userAvatarImg) {
        avatarUpload.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    const base64Image = event.target.result;
                    userAvatarImg.src = base64Image;
                    
                    // Simpan ke session aktif dan simpan spesifik berdasarkan email user
                    localStorage.setItem('launexAvatar', base64Image);
                    if (savedUser) {
                        localStorage.setItem('launexAvatar_' + savedUser, base64Image);
                    }
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // ==========================================
    // 7. PROSES LOGOUT
    // ==========================================
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Anda telah keluar dari dashboard.');
            window.location.href = 'home.html'; 
        });
    }
    
});

// 3. LOGIKA OPERASIONAL EVENT LISTENER PADA JAVASCRIPT
//document.addEventListener('DOMContentLoaded', function() {
    //const btnBuatPesanan = document.getElementById('btn-buat-pesanan');
    //const modalOverlay = document.getElementById('success-modal-overlay');
    //const btnCloseModal = document.getElementById('btn-close-modal');

    // Pemicu 1: Menampilkan Modal saat Tombol "Buat Pesanan" Diklik
    //if (btnBuatPesanan && modalOverlay) {
        //btnBuatPesanan.addEventListener('click', function() {
            //modalOverlay.classList.add('active'); // Menyuntikkan Kelas Active
        //});
    //}

    // Pemicu 2: Menutup Modal dan Pengalihan Rute ke Halaman Dasbor
    //if (btnCloseModal && modalOverlay) {
        //btnCloseModal.addEventListener('click', function() {
            //modalOverlay.classList.remove('active');
            //window.location.href = 'dashboard.html'; // Alur Navigasi Keluar
        //});
    //}
//});