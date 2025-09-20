import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "./lib/auth";
import ProtectedRoute from "./components/ProtectedRoute";
import Landing from "./pages/Landing";
import Features from "./pages/Features";
import About from "./pages/About";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Lessons from "./pages/Lessons";
import Quiz from "./pages/Quiz";
import Challenges from "./pages/Challenges";
import NotFound from "./pages/NotFound";
import SeasonalCampaigns from "./pages/SeasonalCampaigns";
import ThemeBased from "./pages/ThemeBased";
import GlobalMissions from "./pages/GlobalMissions";
import GameSeasonPass from "./pages/GameSeasonPass";
import LearningCapsules from "./pages/LearningCapsules";
import BadgesCertifications from "./pages/BadgesCertifications";
import ThemePlasticFreeJuly from "./pages/ThemePlasticFreeJuly";
import ThemeEarthHour from "./pages/ThemeEarthHour";
import ThemeGreenDecember from "./pages/ThemeGreenDecember";
import StudentJourney from "./pages/StudentJourney";
import StudentLearn from "./pages/StudentLearn";
import StudentAct from "./pages/StudentAct";
import StudentEarn from "./pages/StudentEarn";
import StudentInnovate from "./pages/StudentInnovate";
import ActPlantSaplings from "./pages/ActPlantSaplings";
import ActRun from "./pages/ActRun";
import ActHelpSeniorCitizens from "./pages/ActHelpSeniorCitizens";
import ActHelpOrphans from "./pages/ActHelpOrphans";
import ActFeedAnimals from "./pages/ActFeedAnimals";
import ActDonate from "./pages/ActDonate";
import ActLangar from "./pages/ActLangar";
import EarnEcoCoins from "./pages/EarnEcoCoins";
import EarnCredits from "./pages/EarnCredits";
import EarnBadges from "./pages/EarnBadges";
import EarnCertificates from "./pages/EarnCertificates";
import EarnCoupons from "./pages/EarnCoupons";
import InnovateCreateMemes from "./pages/InnovateCreateMemes";
import InnovateCampaignPowers from "./pages/InnovateCampaignPowers";
import InnovateEcoVoices from "./pages/InnovateEcoVoices";
import InnovateEcoInnovatorsLab from "./pages/InnovateEcoInnovatorsLab";
import InnovateIdeateChallenges from "./pages/InnovateIdeateChallenges";
import DiscussionBoard from "./pages/DiscussionBoard";
import Rewards from "./pages/Rewards";
import AmbassadorLogin from "./pages/AmbassadorLogin";
import UserLogin from "./pages/UserLogin";
import HallOfFame from "./pages/HallOfFame";
import AdminUsers from "./pages/AdminUsers";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import StudentDashboard from "./pages/StudentDashboard";
import TeacherPortal from "./pages/TeacherPortal";
import AmbassadorDashboard from "./pages/AmbassadorDashboard";
import Pathways from "./pages/Pathways";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <div className="transition-all duration-500 ease-in-out">
              <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/features" element={<Features />} />
              <Route path="/about" element={<About />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/dashboard" element={<ProtectedRoute roles={["STUDENT","ADMIN","TEACHER","AMBASSADOR"]}><Dashboard /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute roles={["STUDENT","ADMIN","TEACHER","AMBASSADOR"]}><Profile /></ProtectedRoute>} />
              <Route path="/lessons" element={<Lessons />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/challenges" element={<Challenges />} />
              <Route path="/seasonal-campaigns" element={<SeasonalCampaigns />} />
              {/* Seasonal Campaign sub-routes */}
              <Route path="/theme-based" element={<ThemeBased />} />
              <Route path="/theme-based/plastic-free-july" element={<ThemePlasticFreeJuly />} />
              <Route path="/theme-based/earth-hour" element={<ThemeEarthHour />} />
              <Route path="/theme-based/green-december" element={<ThemeGreenDecember />} />
              <Route path="/global-missions" element={<GlobalMissions />} />
              <Route path="/game-season-pass" element={<GameSeasonPass />} />
              <Route path="/learning-capsules" element={<LearningCapsules />} />
              <Route path="/badges-certifications" element={<BadgesCertifications />} />
              <Route path="/student-journey" element={<StudentJourney />} />
              {/* Student Journey hubs */}
              <Route path="/student-journey/learn" element={<StudentLearn />} />
              <Route path="/student-journey/act" element={<StudentAct />} />
              <Route path="/student-journey/earn" element={<StudentEarn />} />
              <Route path="/student-journey/innovate" element={<StudentInnovate />} />
              {/* Act detail routes */}
              <Route path="/act/plant-saplings" element={<ActPlantSaplings />} />
              <Route path="/act/go-on-a-run" element={<ActRun />} />
              <Route path="/act/help-senior-citizens" element={<ActHelpSeniorCitizens />} />
              <Route path="/act/help-orphans" element={<ActHelpOrphans />} />
              <Route path="/act/feed-animals" element={<ActFeedAnimals />} />
              <Route path="/act/donate" element={<ActDonate />} />
              <Route path="/act/langar" element={<ActLangar />} />
              {/* Earn detail routes */}
              <Route path="/earn/eco-coins" element={<EarnEcoCoins />} />
              <Route path="/earn/credits" element={<EarnCredits />} />
              <Route path="/earn/badges" element={<EarnBadges />} />
              <Route path="/earn/certificates" element={<EarnCertificates />} />
              <Route path="/earn/coupons" element={<EarnCoupons />} />
              {/* Innovate detail routes */}
              <Route path="/innovate/create-memes" element={<InnovateCreateMemes />} />
              <Route path="/innovate/campaign-powers" element={<InnovateCampaignPowers />} />
              <Route path="/innovate/eco-voices" element={<InnovateEcoVoices />} />
              <Route path="/innovate/eco-innovators-lab" element={<InnovateEcoInnovatorsLab />} />
              <Route path="/innovate/ideate-challenges" element={<InnovateIdeateChallenges />} />
              <Route path="/discussion-board" element={<DiscussionBoard />} />
              <Route path="/rewards" element={<Rewards />} />
              <Route path="/ambassador-login" element={<AmbassadorLogin />} />
              <Route path="/user-login" element={<UserLogin />} />
              <Route path="/student-journey/compete" element={<HallOfFame />} />
              <Route path="/admin/users" element={<ProtectedRoute roles={["ADMIN"]}><AdminUsers /></ProtectedRoute>} />
              <Route path="/admin/dashboard" element={<ProtectedRoute adminOnly={true}><AdminDashboard /></ProtectedRoute>} />
              <Route path="/admin-dashboard" element={<ProtectedRoute adminOnly={true}><AdminDashboard /></ProtectedRoute>} />
              <Route path="/admindashboard" element={<ProtectedRoute adminOnly={true}><AdminDashboard /></ProtectedRoute>} />
              <Route path="/admin/login" element={<AdminLogin />} />
              {/* Role-specific dashboards */}
              <Route path="/student-dashboard" element={<ProtectedRoute roles={["STUDENT"]}><StudentDashboard /></ProtectedRoute>} />
              <Route path="/teacher-portal" element={<ProtectedRoute roles={["TEACHER"]}><TeacherPortal /></ProtectedRoute>} />
              <Route path="/ambassador-dashboard" element={<ProtectedRoute roles={["AMBASSADOR"]}><AmbassadorDashboard /></ProtectedRoute>} />
              <Route path="/pathways" element={<Pathways />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
