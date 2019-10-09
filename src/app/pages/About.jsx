import React from 'react'
import CN from 'classnames'
import ego from '../assets/ego.png'
import '../scss/pages/About.scss'
import NeoText from '../components/NeoText'
// import logger from '../utils/logger';
// let log = logger(`<About/>:`);


export default function About(props) {
	const isVisible = () => {
		props.api && props.api.reBuild();
		return props.api ? props.api.getActiveSection().anchor === props.page : false;
	}



	const neoOptions = {
		className: 'scrambled-text title',
		//Controls
		loop: true,
		delay: 500,
		loopDelay: 2000,
		lapses: 8,
		reset: true,
		autoPlay: true,
		speed: 'medium',
		initialText: 'Digital Villa',
		phrases: [
			'Husband',
			'Father',
			'Developer',
			'Designer',
		]
	}
	const title = 'I am';

	return (
		<div className={CN("container-fluid " + props.page, { "animate": isVisible() })}>

			<div className="scrambled-container">
				<div className="slashed">
					<div className="top" title={title}></div>
					<div className="bot" title={title}></div>
				</div>
				<NeoText options={neoOptions} animate={isVisible()} />
			</div>
			<img className="left" src={ego} alt="Profile Left" />
			<img className="right" src={ego} alt="Profile Right" />
			<div className="article">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. um officia repellat, voluptates nam dolores. Cum, nam maxime excepturi ad alias inventore, non doloremque nemo quos est beatae! Accusamus maxime molestias minima enim, impedit nam corrupti voluptate maiores saepe atque natus facilis aliquam, eveniet, optio numquam voluptatibus eaque recusandae nostrum nobis itaque odit culpa quod! Voluptas quam similique dolore dolor nihil accusamus alias enim numquam, tenetur quos hic esse magni maxime? Possimus perferendis, totam est corporis explicabo fugit libero quaerat quis, debitis quae saepe ipsa omnis nisi, deserunt magni dolore excepturi porro voluptatibus! Quos quo officia ab ea similique vero maiores ullam earum rem eius a ipsa odio, inventore eligendi fugit quibusdam omnis saepe esse pariatur animi iusto placeat vel mollitia dolore! Voluptate animi sit porro! Reiciendis aliquid rem suscipit quas sunt atque esse ea ipsa possimus repellat veniam aperiam, dignissimos accusamus tempora quo? Asperiores necessitatibus omnis repellendus tenetur, iure sed reprehenderit ullam perspiciatis aspernatur enim architecto non quas dolorum. Nisi rem provident accusamus nobis, voluptates culpa expedita. Consequatur inventore, velit labore placeat excepturi dolor dignissimos illum explicabo dolorum. Perspiciatis ipsum quia eos blanditiis, dolore libero esse quidem voluptatem quod. Doloremque quisquam accusamus esse nisi, nostrum eius. Facilis minima veniam numquam fuga perferendis ratione, inventore nesciunt nihil repellat, quis adipisci expedita vitae! Dolores nulla ullam facilis? Quos incidunt doloremque molestiae asperiores eos distinctio sed neque odit voluptatem illo fugit placeat, vitae cumque atque nemo labore inventore, sunt animi quisquam excepturi cum. Quod nulla in libero molestiae consequatur possimus distinctio architecto doloremque, et itaque reiciendis necessitatibus voluptatem. Neque accusantium quaerat omnis, obcaecati culpa magni reiciendis sint rem delectus voluptate eius magnam, corporis rerum. Sunt aliquid delectus aperiam, officia, a hic id recusandae expedita molestiae in, fugiat voluptas omnis praesentium maxime quidem repudiandae beatae adipisci et asperiores. Quidem obcaecati ipsam, aliquam eveniet mollitia, unde nobis incidunt ducimus maxime, tenetur dolorem dignissimos eum nam vitae ut cum in dolore? Facilis quo recusandae ut eum architecto sit sed tempore debitis maxime amet nobis in libero possimus non dolore ducimus iure totam voluptas doloribus, ad sapiente voluptatibus enim? Cum reprehenderit iusto dolorem dolorum quisquam illo aliquam libero iure natus sed obcaecati minima placeat tempore aliquid explicabo, non fuga nisi repudiandae? Voluptatem, recusandae exercitationem repellendus, ab praesentium magnam impedit suscipit explicabo, ipsam reprehenderit ipsum. Aspernatur veritatis cumque quo quia doloremque sapiente nesciunt ipsum. Nulla cupiditate eaque harum aspernatur? Ipsa dolorem consequuntur eligendi, molestias quod nihil nobis rerum quidem voluptas error placeat repudiandae temporibus similique consectetur magni asperiores voluptatum repellat. Obcaecati sapiente suscipit delectus sequi nihil id dicta cumque corporis. Excepturi quod exercitationem expedita molestiae veritatis culpa officiis tenetur obcaecati perferendis provident dicta sunt, mollitia reprehenderit. Ea eos optio suscipit distinctio veniam beatae pariatur incidunt, deserunt, officiis fuga, sed accusantium dignissimos hic. Harum molestiae nemo modi repellendus. Totam eveniet enim illum aliquam omnis minus et deserunt, optio porro officia recusandae soluta modi maiores non sit aspernatur est incidunt nihil voluptatem eum voluptatum reprehenderit ducimus laudantium eaque! Libero modi voluptates nihil aperiam?
			</div>
		</div>

	)

}
