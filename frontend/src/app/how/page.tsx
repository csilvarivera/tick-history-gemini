import { Menu } from '@/components/Menu';
import { Container } from '@/components/Container';

export default function HowPage() {

  return (
    <div>
      <Menu />
        <Container className='' style={{background: 'white'}}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '120vh', background: 'white' }}>
            <div style={{ width: '95%', padding: '20px', background: '#fff', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                <img
                  src={'/images/architecture-diagram.png'}
                  alt="Architecture diagram"
                />
              </div>
            </div>
          </div>
        </Container>
      </div>
  );
}