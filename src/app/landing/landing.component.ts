import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
})
export class LandingComponent implements OnInit, OnDestroy, AfterViewInit {
  private el = inject(ElementRef);

  rotatingWords = ['fiados', 'vendas', 'gastos', 'lucros', 'estoque'];
  currentWordIndex = 0;
  isAnimatingOut = false;
  currentYear = new Date().getFullYear();

  private rotateInterval?: ReturnType<typeof setInterval>;

  readonly whatsappUrl =
    'https://wa.me/5500000000000?text=Oi!%20Quero%20testar%20o%20SaldoReal%20gr%C3%A1tis';

  get currentWord(): string {
    return this.rotatingWords[this.currentWordIndex];
  }

  ngOnInit(): void {
    this.rotateInterval = setInterval(() => {
      this.isAnimatingOut = true;
      setTimeout(() => {
        this.currentWordIndex = (this.currentWordIndex + 1) % this.rotatingWords.length;
        this.isAnimatingOut = false;
      }, 320);
    }, 2500);
  }

  ngAfterViewInit(): void {
    this.initScrollAnimations();
  }

  ngOnDestroy(): void {
    if (this.rotateInterval) {
      clearInterval(this.rotateInterval);
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
