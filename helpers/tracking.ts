import TrackingCorreios from 'tracking-correios'

TrackingCorreios.track( 'OY005099174BR' )
    .then(console.log)

async function rastrearEncomenda(codigo: string): Promise<void> {
  TrackingCorreios.track( codigo )
  .then(console.log)
}

// Exportando a função rastrear
export { rastrearEncomenda };
