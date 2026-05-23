// C:/Users/Amit/antigravity/gamesdealshub-next/src/app/contact/page.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | GamesDealsHub',
  description: 'Get in touch with the GamesDealsHub team. Report a missing deal or send us feedback.',
  alternates: { canonical: '/contact' }
};

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Contact Us</h1>
      <p className="mb-6 text-gray-700">Have a question, feedback, or want to report a missing free game? We'd love to hear from you.</p>
      <form action="https://api.web3forms.com/submit" method="POST" className="flex flex-col gap-4">
        {/* Replace this with your actual Web3Forms access key */}
        <input type="hidden" name="access_key" value={process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "YOUR_ACCESS_KEY_HERE"} />
        <input type="hidden" name="subject" value="New Contact Form Submission from GamesDealsHub" />
        <input type="hidden" name="redirect" value="https://gamesdealshub.me" />

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input type="text" id="name" name="name" required className="w-full px-4 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500" />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input type="email" id="email" name="email" required className="w-full px-4 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500" />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
          <textarea id="message" name="message" required rows={5} className="w-full px-4 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"></textarea>
        </div>
        <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-lg self-start transition-colors">
          Send Message
        </button>
      </form>
    </div>
  );
}
