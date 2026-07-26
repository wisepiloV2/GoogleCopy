import { useActivityHistory } from '../hooks/useActivityHistory';

export default function ActivityHistory() {
  const { activities } = useActivityHistory();

  return (
    <div className="fade-in">
      <h2>Historial de actividad</h2>
      <p className="subtitle mb-large">Revisa la actividad reciente en tu cuenta y los inicios de sesión.</p>
      
      <div className="data-card">
        <div className="data-list">
          {activities.map((activity) => (
            <div key={activity.id} className="list-item-history">
              <div className="history-info">
                <h4>{activity.title}</h4>
                <p className="subtitle">{activity.details}</p>
              </div>
              <span className="time">{activity.time}</span>
            </div>
          ))}
          <div className="list-item-action">
            <span className="link-text">Ver toda la actividad</span>
          </div>
        </div>
      </div>
    </div>
  );
}