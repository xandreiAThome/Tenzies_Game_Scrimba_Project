export default function Die(props) {
  const styles = {
    background: props.isHeld ? "#59E391" : "white",
  };

  return (
    <div className="die" style={styles} onClick={props.Hold}>
      <h2 className="die--num">{props.value}</h2>
    </div>
  );
}
