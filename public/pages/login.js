//import { supabase } from './auth'
const supabase = require('./auth');

// DOM elements
const signupForm = document.getElementById('signup-form')
const loginForm = document.getElementById('login-form')
const logoutBtn = document.getElementById('logout-btn')
const statusDiv = document.getElementById('status')

// Signup
signupForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const email = document.getElementById('signup-email').value
    const password = document.getElementById('signup-password').value
    const { data, error } = await supabase.auth.signUp({ email, password })
    statusDiv.textContent = error ? `Error: ${error.message}` : 'Signup successful! Check your email.'
})

// Login
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const email = document.getElementById('login-email').value
    const password = document.getElementById('login-password').value
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    statusDiv.textContent = error ? `Error: ${error.message}` : `Logged in as ${data.user.email}`
})

// Logout
logoutBtn.addEventListener('click', async () => {
    const { error } = await supabase.auth.signOut()
    statusDiv.textContent = error ? `Error: ${error.message}` : 'Logged out successfully'
})

// Auth state listener
supabase.auth.onAuthStateChange((event, session) => {
    console.log(event, session)
    if (session?.user) {
    statusDiv.textContent = `Logged in as ${session.user.email}`
    }
})