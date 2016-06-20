<?php
/*
Template Name: get ins
*/

if ( !function_exists("do_post") ) {

    function do_post($url, $data) {
        $header[] = "Accept: application/json";
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
        curl_setopt ( $ch, CURLOPT_RETURNTRANSFER, TRUE );
        curl_setopt ( $ch, CURLOPT_POST, TRUE );
        curl_setopt ( $ch, CURLOPT_POSTFIELDS, $data );
        curl_setopt ( $ch, CURLOPT_URL, $url );
        curl_setopt ( $ch, CURLOPT_SSL_VERIFYPEER, FALSE);
        $ret = curl_exec ( $ch );
        curl_close ( $ch );
        return $ret;
    }

}

get_header(); ?>
    <style>.get-token-holder{
        padding:40px 0;}
.get-token-message{
    font-size:12px;
    color:rgba(0, 0, 0, 0.44);
    margin-bottom:20px;
}
.token{
    font-weight:700;
}
        </style>
<main class="main-content">
        <section class="section-body">
        <div class="u-textAlignCenter get-token-holder">
<?php
if($_GET['code']){
	$url = 'https://api.instagram.com/oauth/access_token';
	$data = 'client_id=63d81af8a75d41b6ba8fdf26cc833982&client_secret=c91257ea048541489d84fc98b57472d6&grant_type=authorization_code&redirect_uri=' . urlencode (home_url('/get-instagram-token')) . '&code=' . $_GET['code'];
	$output = json_decode(do_post($url,$data),true);
    echo '<div class="get-token-message">成功获取<code>token</code>，您的<code>token</code>为</div><div class="token">' . $output['access_token'] .'</div>';
} else {

$ursssl =  'https://api.instagram.com/oauth/authorize/?client_id=63d81af8a75d41b6ba8fdf26cc833982&redirect_uri=' . urlencode (home_url('/get-instagram-token')) . '&response_type=code';

	echo '<div class="get-token-message">点击下面的按钮获取<code>token</code></div>
    <a href="' . $ursssl . '" class="button button--primary" style="line-height:36px">获取token</a>';
}
?>
    </div>

	</section>
    </main>

<?php get_footer(); ?>