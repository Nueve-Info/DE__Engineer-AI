import { Container } from '../ui/Container'
import moniqueImage from '../../assets/Monique.png'
import krystianImage from '../../assets/krystian.png'
import alumniPhoto1 from '../../assets/pics/photo-1507003211169-0a1dd7228f2d.jpeg'

type Testimonial = {
  quote: string
  name: string
  role: string
  avatar: string
  avatarImage?: string | null
  bullets?: string[]
}

const testimonials: Testimonial[] = [
  {
    quote: "(...) This later allowed me to land a $5000 project, which led to getting a full-time job.",
    name: "Miro K.",
    role: "Product Designer",
    avatar: "SK",
    avatarImage: null,
  },
  {
    quote: "Nueve was a game changer for me. It allowed me to showcase my work in a way that was not possible before.",
    name: "Monique M.",
    role: "UX Designer",
    avatar: "MO",
    avatarImage: moniqueImage,
  },
  {
    quote: "I get so many projects that I can comfortably work as a freelancer.",
    name: "Chris K.",
    role: "Freelance Designer",
    avatar: "KK",
    avatarImage: krystianImage,
  }
]

export function SocialProof() {
  return (
    <section className="py-24 code-bg">
      <Container>
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Join The First Wave of{' '}
            <span className="gradient-text">Design Engineers</span>
          </h2>
        </div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-[var(--color-surface)] rounded-2xl p-6 border border-[var(--color-surface-light)] hover:border-[var(--color-primary)]/30 transition-all flex flex-col"
            >
              <div className="flex items-center gap-3 mb-4">
                {testimonial.avatarImage ? (
                  <img
                    src={testimonial.avatarImage}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-[var(--color-surface-light)]"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center text-white font-semibold text-sm">
                    {testimonial.avatar}
                  </div>
                )}
                <div>
                  <div className="font-semibold text-[var(--color-text-primary)]">{testimonial.name}</div>
                  <div className="text-sm text-[var(--color-text-muted)]">{testimonial.role}</div>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-[var(--color-text-primary)] font-medium text-lg">"{testimonial.quote}"</p>
              </div>

              {testimonial.bullets && (
                <ul className="space-y-3 mt-auto border-t border-[var(--color-surface-light)] pt-4">
                  {testimonial.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[var(--color-text-secondary)]">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] flex-shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* Student count badge */}
        <div className="flex justify-center">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-3.5">
              {[alumniPhoto1, krystianImage, moniqueImage].map((pic, i) => (
                <img
                  key={i}
                  src={pic}
                  alt={`Alumni ${i + 1}`}
                  className="w-8 h-8 rounded-full border-2 border-[var(--color-surface-dark)] object-cover"
                />
              ))}
            </div>
            <div className="text-sm text-[var(--color-text-secondary)]">
              <span className="font-semibold text-[var(--color-text-primary)]">Over 2,900</span> Nueve alumni
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
