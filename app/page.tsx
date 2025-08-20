"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle,
  Mail,
  Shield,
  Users,
  Cloud,
  Video,
  Calendar,
  Phone,
  Star,
  Sparkles,
  Brain,
  Zap,
  MessageSquare,
  FileText,
  Search,
} from "lucide-react"

export default function GoogleWorkspaceReseller() {
  const [isContactOpen, setIsContactOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [submitMessage, setSubmitMessage] = useState('')

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setSubmitMessage('')

    const formData = new FormData(e.target as HTMLFormElement)
    const data = {
      fullName: formData.get('fullName') as string,
      designation: formData.get('designation') as string,
      companyName: formData.get('companyName') as string,
      website: formData.get('website') as string,
      phone: formData.get('phone') as string,
      message: formData.get('message') as string,
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (response.ok) {
        setSubmitStatus('success')
        setSubmitMessage(result.message || 'Your inquiry has been sent successfully!')
        // Reset form
        ;(e.target as HTMLFormElement).reset()
        // Close modal after 2 seconds
        setTimeout(() => {
          setIsContactOpen(false)
          setSubmitStatus('idle')
          setSubmitMessage('')
        }, 2000)
      } else {
        setSubmitStatus('error')
        setSubmitMessage(result.error || 'Failed to send inquiry. Please try again.')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
      setSubmitMessage('Network error. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Header */}
      <header className="border-b bg-white/70 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div
            className={`flex items-center space-x-2 transition-all duration-1000 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"}`}
          >
            <img 
              src="https://www.digitbiteai.com/images/logos/digitbite-logo-white.png" 
              alt="Digitbite Logo" 
              className="h-8 w-auto object-contain"
            />
          </div>
          <Dialog open={isContactOpen} onOpenChange={setIsContactOpen}>
            <DialogTrigger asChild>
              <Button
                className={`bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg transition-all duration-500 ${isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"}`}
              >
                Get Started Today
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white/95 backdrop-blur-md border-0 shadow-2xl">
              <DialogHeader>
                <DialogTitle className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Contact Us for Google Workspace
                </DialogTitle>
                <DialogDescription>
                  Get your Google Workspace Business Plus plan with AI-powered Gemini Pro. Whether you want a quote,
                  demo, or more information about our AI features, fill out the form below and we'll get back to you
                  within 24 hours.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <p className="text-green-800 font-medium">{submitMessage}</p>
                    </div>
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-800 font-medium">{submitMessage}</p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      placeholder="John Doe"
                      required
                      disabled={isSubmitting}
                      className="bg-white/50 backdrop-blur-sm border-gray-200 disabled:opacity-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="designation">Designation *</Label>
                    <Input
                      id="designation"
                      name="designation"
                      placeholder="IT Manager"
                      required
                      disabled={isSubmitting}
                      className="bg-white/50 backdrop-blur-sm border-gray-200 disabled:opacity-50"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name *</Label>
                  <Input
                    id="companyName"
                    name="companyName"
                    placeholder="Your Company Ltd."
                    required
                    disabled={isSubmitting}
                    className="bg-white/50 backdrop-blur-sm border-gray-200 disabled:opacity-50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    name="website"
                    type="url"
                    placeholder="https://yourcompany.com"
                    disabled={isSubmitting}
                    className="bg-white/50 backdrop-blur-sm border-gray-200 disabled:opacity-50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    required
                    disabled={isSubmitting}
                    className="bg-white/50 backdrop-blur-sm border-gray-200 disabled:opacity-50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us about your Google Workspace requirements..."
                    rows={3}
                    disabled={isSubmitting}
                    className="bg-white/50 backdrop-blur-sm border-gray-200 disabled:opacity-50"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting || submitStatus === 'success'}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </div>
                  ) : submitStatus === 'success' ? (
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>Sent Successfully!</span>
                    </div>
                  ) : (
                    'Send Inquiry'
                  )}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 relative">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge
            className={`mb-4 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 hover:from-blue-200 hover:to-purple-200 border-0 shadow-md transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Authorized Google Workspace Reseller with AI
          </Badge>
          <h1
            className={`text-4xl md:text-6xl font-bold text-gray-900 mb-6 transition-all duration-1000 delay-200 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            Transform Your Business with{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-pulse">
              Google Workspace AI
            </span>
          </h1>
          <p
            className={`text-xl text-gray-600 mb-8 leading-relaxed transition-all duration-1000 delay-400 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            Get Google Workspace Business Plus powered by <strong>Gemini Pro AI</strong> for your enterprise. Advanced
            AI assistance, secure cloud collaboration, professional email, and unlimited productivity tools. Minimum 100
            users - perfect for growing businesses in India.
          </p>
          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-600 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            <Dialog open={isContactOpen} onOpenChange={setIsContactOpen}>
              <DialogTrigger asChild>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Get AI-Powered Workspace
                </Button>
              </DialogTrigger>
            </Dialog>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-3 bg-white/70 backdrop-blur-sm border-gray-200 hover:bg-white/90 transition-all duration-300 hover:scale-105"
              onClick={() => setIsContactOpen(true)}
            >
              View AI Features
            </Button>
          </div>
          <div
            className={`mt-8 flex items-center justify-center space-x-6 text-sm text-gray-500 transition-all duration-1000 delay-800 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>Trusted by 3M+ businesses</span>
            </div>
            <div className="flex items-center space-x-1">
              <Brain className="w-4 h-4 text-purple-600" />
              <span>AI-powered productivity</span>
            </div>
            <div className="flex items-center space-x-1">
              <Shield className="w-4 h-4" />
              <span>Enterprise-grade security</span>
            </div>
          </div>
        </div>
      </section>

      {/* AI Features Section */}
      <section className="py-16 px-4 relative">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-800 border-0">
              <Brain className="w-4 h-4 mr-2" />
              Powered by Google Gemini Pro
            </Badge>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Revolutionary AI Features</h2>
            <p className="text-lg text-gray-600">
              Experience the future of productivity with Google's most advanced AI integrated into every app
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 bg-white/70 backdrop-blur-md shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 group">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mb-2 group-hover:rotate-12 transition-transform duration-300">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Smart Compose & Reply
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Gemini Pro writes emails, suggests responses, and helps compose professional messages in Gmail with
                  contextual AI assistance.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/70 backdrop-blur-md shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 group">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center mb-2 group-hover:rotate-12 transition-transform duration-300">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  AI Document Creation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Generate documents, presentations, and spreadsheets with AI. Create content from prompts in Google
                  Docs, Sheets, and Slides.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/70 backdrop-blur-md shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 group">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mb-2 group-hover:rotate-12 transition-transform duration-300">
                  <Search className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Intelligent Search
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Find information across all your Google Workspace apps with natural language queries powered by Gemini
                  Pro AI.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/70 backdrop-blur-md shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 group">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center mb-2 group-hover:rotate-12 transition-transform duration-300">
                  <Video className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  AI Meeting Summaries
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Automatic meeting transcription, action item extraction, and intelligent summaries in Google Meet with
                  Gemini Pro.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/70 backdrop-blur-md shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 group">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center mb-2 group-hover:rotate-12 transition-transform duration-300">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  Smart Data Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  AI-powered insights and data analysis in Google Sheets. Generate charts, formulas, and business
                  intelligence automatically.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/70 backdrop-blur-md shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 group">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-500 rounded-lg flex items-center justify-center mb-2 group-hover:rotate-12 transition-transform duration-300">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  Contextual AI Assistant
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Get intelligent suggestions and assistance across all Google Workspace apps with context-aware AI
                  recommendations.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 px-4 relative">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Google Workspace Business Plus with AI</h2>
            <p className="text-lg text-gray-600">
              Everything your business needs to collaborate, communicate, and grow with AI
            </p>
          </div>

          <Card className="max-w-md mx-auto border-0 bg-white/80 backdrop-blur-md shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105">
            <CardHeader className="text-center bg-gradient-to-br from-blue-50/80 to-purple-50/80 backdrop-blur-sm">
              <Badge className="w-fit mx-auto mb-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
                <Sparkles className="w-4 h-4 mr-1" />
                AI-Powered
              </Badge>
              <CardTitle className="text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Business Plus
              </CardTitle>
              <CardDescription>Perfect for growing enterprises with AI</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  ₹1,700
                </span>
                <span className="text-gray-600">/user/month</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">Annual commitment • Minimum 100 users</p>
              <p className="text-xs text-green-600 font-medium mt-1 animate-pulse">
                Up to 75% discount available on request
              </p>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>
                    <strong>Gemini Pro AI</strong> across all apps
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>5TB cloud storage per user</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>AI-powered email & smart compose</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Advanced security & admin controls</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>500-participant video meetings with AI</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>AI meeting summaries & transcription</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Smart document creation & analysis</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>24/7 customer support</span>
                </div>
              </div>
              <Dialog open={isContactOpen} onOpenChange={setIsContactOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <Brain className="w-4 h-4 mr-2" />
                    Contact AI Sales Team
                  </Button>
                </DialogTrigger>
              </Dialog>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Google Workspace Business Plus?</h2>
            <p className="text-lg text-gray-600">Comprehensive productivity suite designed for modern businesses</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 bg-white/70 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 group">
              <CardHeader>
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center mb-2 group-hover:rotate-12 transition-transform duration-300">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Professional Email</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Custom business email with your domain name. Advanced spam protection and 99.9% uptime guarantee.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/70 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 group">
              <CardHeader>
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center mb-2 group-hover:rotate-12 transition-transform duration-300">
                  <Video className="w-6 h-6 text-white" />
                </div>
                <CardTitle>HD Video Meetings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Host meetings with up to 500 participants. Recording, live streaming, and advanced meeting controls.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/70 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 group">
              <CardHeader>
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-2 group-hover:rotate-12 transition-transform duration-300">
                  <Cloud className="w-6 h-6 text-white" />
                </div>
                <CardTitle>5TB Storage</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Massive cloud storage per user. Access files anywhere, anytime with automatic sync across devices.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/70 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 group">
              <CardHeader>
                <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center mb-2 group-hover:rotate-12 transition-transform duration-300">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Enterprise Security</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Advanced security features, 2-step verification, endpoint management, and data loss prevention.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/70 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 group">
              <CardHeader>
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mb-2 group-hover:rotate-12 transition-transform duration-300">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Team Collaboration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Real-time collaboration on documents, spreadsheets, and presentations. Share and edit together.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/70 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 group">
              <CardHeader>
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center mb-2 group-hover:rotate-12 transition-transform duration-300">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Smart Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Intelligent scheduling, room booking, and calendar sharing. Integrate with Gmail and Meet seamlessly.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h2 className="text-3xl font-bold mb-4">Ready to Upgrade Your Business with AI?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of businesses already using Google Workspace Business Plus with Gemini Pro AI. Get started
            with our expert setup and migration support. Special discounts up to 75% available for qualified businesses.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Dialog open={isContactOpen} onOpenChange={setIsContactOpen}>
              <DialogTrigger asChild>
                <Button
                  size="lg"
                  variant="secondary"
                  className="text-lg px-8 py-3 bg-white text-blue-600 hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Get AI Quote Now
                </Button>
              </DialogTrigger>
            </Dialog>
            <Dialog open={isContactOpen} onOpenChange={setIsContactOpen}>
              <DialogTrigger asChild>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-blue-600 bg-transparent shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  Schedule AI Demo
                </Button>
              </DialogTrigger>
            </Dialog>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900/95 backdrop-blur-md text-white py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img 
                  src="https://www.digitbiteai.com/images/logos/digitbite-logo.png" 
                  alt="Digitbite Logo" 
                  className="h-8 w-auto object-contain filter brightness-150"
                />
              </div>
              <p className="text-gray-400">
                Authorized Google Workspace reseller helping businesses transform their productivity with AI.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">AI Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Google Workspace AI Setup</li>
                <li>Gemini Pro Integration</li>
                <li>AI Training & Support</li>
                <li>Custom AI Solutions</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>24/7 Customer Support</li>
                <li>AI Documentation</li>
                <li>Video Tutorials</li>
                <li>Live Chat Support</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>sales@workspacepartner.com</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>
              &copy; 2024 Digitbite. All rights reserved. Google Workspace and Gemini Pro are trademarks of
              Google LLC.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
