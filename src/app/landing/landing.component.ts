import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef, NgZone, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
})
export class LandingComponent implements OnInit, OnDestroy, AfterViewInit {
  private el = inject(ElementRef);
  private zone = inject(NgZone);

  rotatingWords = ['fiados', 'vendas', 'gastos', 'lucros', 'estoque'];
  currentWordIndex = 0;
  isAnimatingOut = false;
  currentYear = new Date().getFullYear();

  private rotateInterval?: ReturnType<typeof setInterval>;
  private testimonialsInterval?: ReturnType<typeof setInterval>;

  readonly whatsappUrl =
    `https://wa.me/${environment.whatsappBotNumber}?text=Oi!%20Quero%20testar%20o%20SaldoReal%20gr%C3%A1tis`;

  readonly whatsappSupportUrl =
    `https://wa.me/${environment.whatsappSupportNumber}?text=Oi!%20Preciso%20de%20ajuda%20com%20o%20SaldoReal`;

  get currentWord(): string {
    return this.rotatingWords[this.currentWordIndex];
  }

  testimonialIndex = 0;

  testimonials = [
    {
      quote: 'Em duas semanas já senti diferença no caixa. Passei a controlar melhor vendas, gastos e fiados.',
      name: 'Bruna T.',
      role: 'Revendedora boticário',
    },
    {
      quote: 'Antes eu esquecia quem me devia. Agora o Saldo Real me lembra certinho e eu recebo muito mais no fim do mês.',
      name: 'Juliana M.',
      role: 'Revendedora de cosméticos',
    },
    {
      quote: 'Eu só mando áudio no WhatsApp e ele organiza tudo. Finalmente sei meu lucro de verdade.',
      name: 'Carla S.',
      role: 'Revendedora autônoma',
    },
    {
      quote: 'Com os lembretes automáticos, parei de perder prazo e de pagar conta com multa.',
      name: 'Patrícia R.',
      role: 'Revendedora Natura',
    },
    {
      quote: 'O melhor foi sair das planilhas. Está tudo no WhatsApp, simples e rápido de usar no dia a dia.',
      name: 'Fernanda L.',
      role: 'Revendedora Avon',
    },
  ];

  ngOnInit(): void {
    this.zone.run(() => {
      this.rotateInterval = setInterval(() => {
        this.isAnimatingOut = true;
        setTimeout(() => {
          this.currentWordIndex = (this.currentWordIndex + 1) % this.rotatingWords.length;
          this.isAnimatingOut = false;
        }, 320);
      }, 2500);

      this.testimonialsInterval = setInterval(() => {
        this.testimonialIndex = (this.testimonialIndex + 1) % this.testimonials.length;
      }, 4500);
    });
  }

  ngAfterViewInit(): void {
    this.initScrollAnimations();
  }

  ngOnDestroy(): void {
    if (this.rotateInterval) {
      clearInterval(this.rotateInterval);
    }
    if (this.testimonialsInterval) {
      clearInterval(this.testimonialsInterval);
    }
  }

  private initScrollAnimations(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.07, rootMargin: '0px 0px -30px 0px' }
    );

    const elements = this.el.nativeElement.querySelectorAll('.animate-on-scroll');
    elements.forEach((elem: Element) => observer.observe(elem));
  }

  scrollTo(sectionId: string): void {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  nextTestimonial(): void {
    this.testimonialIndex = (this.testimonialIndex + 1) % this.testimonials.length;
  }

  prevTestimonial(): void {
    this.testimonialIndex =
      (this.testimonialIndex - 1 + this.testimonials.length) % this.testimonials.length;
  }

  goToTestimonial(index: number): void {
    this.testimonialIndex = index;
  }

  problems = [
    {
      title: 'Perdeu o controle do fiado',
      desc: 'Você anota num papel, esquece de cobrar e no fim do mês não sabe mais o que recebeu ou o que perdeu.',
    },
    {
      title: 'Não sabe quanto lucrou',
      desc: 'Vende bastante, mas o dinheiro some e você não consegue fechar as contas no fim do mês.',
    },
    {
      title: 'Não consegue usar nenhum app',
      desc: 'Todo app ou planilha que tentou ficou abandonado depois de alguns dias. Falta tempo, não disposição.',
    },
  ];

  features = [
    {
      icon: '🤝',
      title: 'Controle de fiado',
      desc: 'Anota quem te deve, o valor e a data. Lembretes automáticos de cobrança antes do vencimento.',
    },
    {
      icon: '📊',
      title: 'Resumo financeiro',
      desc: 'Saiba exatamente quanto faturou, gastou e lucrou. É só perguntar "resumo do mês".',
    },
    {
      icon: '🛒',
      title: 'Registro de vendas',
      desc: 'Registre vendas, compras de estoque e despesas com uma mensagem simples.',
    },
    {
      icon: '🔔',
      title: 'Lembretes de contas',
      desc: 'Configure suas contas a pagar e receba alertas antes do vencimento. Nunca mais esqueça.',
    },
    {
      icon: '🎙️',
      title: 'Áudio e comprovantes',
      desc: 'Manda um áudio ou foto do comprovante de PIX que o SaldoReal registra automaticamente.',
    },
    {
      icon: '📋',
      title: 'Extrato por categoria',
      desc: 'Veja para onde o dinheiro está indo: estoque, custos operacionais, despesas pessoais e muito mais.',
    },
  ];

  pricingFeatures = [
    'Controle de fiado com lembretes automáticos',
    'Registro de vendas, compras e despesas',
    'Resumo financeiro mensal',
    'Extrato por categoria',
    'Lembretes de contas a pagar',
    'Aceita áudio, texto e comprovante de PIX',
    'Suporte direto pelo WhatsApp',
  ];
}
